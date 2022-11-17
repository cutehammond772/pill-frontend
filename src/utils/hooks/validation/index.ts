import { useCallback, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import {
  registerValidation,
  updateValidation,
} from "../../reducers/validation";
import {
  AddDependencyIdProps,
  StoredValidationResult,
} from "../../reducers/validation/validation.type";
import {
  ALL_PASSED,
  DEFAULT_ID,
  DEPENDENCIES_NOT_CHECKED,
  DomainValidator,
  NOT_REGISTERED,
  ValidatedType,
  ValidationMessageEnum,
} from "../../validators/validator.type";

const useValidation = <T, E extends ValidationMessageEnum>(
  validator: DomainValidator<T, E>
) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.validation.data);

  const dependencyIds = useRef<{ [signature: string]: Array<string> }>({});
  const dependencyResult = useRef<StoredValidationResult>();

  // useValidation Hook 생성 시, redux container에 해당 validator의 signature가 존재하지 않으면 새로 생성한다.
  if (!data[validator.signature]) {
    dispatch(registerValidation({ signature: validator.signature }));
  }

  // result를 토대로 Validation 정보를 업데이트한다.
  const update = useCallback(
    (result: StoredValidationResult) => {
      dispatch(
        updateValidation({
          result: result,
          signature: validator.signature,
          id: validator.id,
        })
      );
    },
    [dispatch, validator]
  );

  // 특정 타입의 데이터를 받아 Validation 과정을 진행한다.
  const validate = useCallback(
    (t: T) => {
      const results = validator.validators.map((v) => v(t));
      if (results.every((r) => r.result === ValidatedType.PASS)) {
        // 모든 validator가 'PASS'를 반환한 경우, 정해진 ALL_PASS 메시지와 함께 'INVALID'로 저장된다.
        update({ result: ValidatedType.INVALID, message: ALL_PASSED });
      } else if (results.some((r) => r.result === ValidatedType.INVALID)) {
        // 하나라도 'INVALID'를 반환한 경우, 맨 처음 'INVALID'를 반환한 Validator의 메시지와 함께 'INVALID'로 저장된다.
        update({
          result: ValidatedType.INVALID,
          message: results.find((r) => r.result === ValidatedType.INVALID)
            ?.message,
        });
      } else {
        // 모든 Validator의 반환 값이 'VALID' 또는 'PASS'이면 'VALID'로 저장된다.
        update({ result: ValidatedType.VALID });
      }
    },
    [update, validator]
  );

  // 이 도메인 Validator의 Validation 결과가 Valid인지 확인한다.
  // 이때, 의존하는 Validator까지 모두 고려한다는 점에 유의한다.
  const isValid = useCallback(() => {
    if (!data[validator.signature]) {
      return false;
    }

    if (validator.dependencies.length !== 0) {
      if (
        !dependencyResult.current ||
        dependencyResult.current.result === ValidatedType.INVALID
      ) {
        return false;
      }
    }

    return (
      data[validator.signature][validator.id || DEFAULT_ID].result ===
      ValidatedType.VALID
    );
  }, [data, validator]);

  // 이 도메인 Validator의 Validation 결과 메시지를 나타낸다.
  // 1. 도메인 Validator의 Validation 결과가 'VALID'이지만 의존하는 Validators가 'INVALID'이면
  // 결국 'INVALID'이므로, 메시지는 'INVALID'한 '의존하는 Validators' 중 맨 처음 Validator의 메시지를 반환한다.
  // 2. 이 이외의 경우 무조건 도메인 Validator의 메시지를 우선 반환하게 된다.
  const getMessage = useCallback(() => {
    if (!data[validator.signature]) {
      return undefined;
    }

    const message =
      data[validator.signature][validator.id || DEFAULT_ID].message;

    if (validator.dependencies.length !== 0) {
      if (!dependencyResult.current) {
        return DEPENDENCIES_NOT_CHECKED;
      }

      if (dependencyResult.current.result === ValidatedType.INVALID) {
        if (
          data[validator.signature][validator.id || DEFAULT_ID].result ===
          ValidatedType.VALID
        ) {
          return dependencyResult.current.message;
        }
      }
    }

    return message;
  }, [data, validator]);

  // 의존하는 Validators의 Validation 결과를 모은다.
  const accumulateDependencies = useCallback(() => {
    for (const signature in validator.dependencies) {
      if (!data[signature]) {
        return { result: ValidatedType.INVALID, message: NOT_REGISTERED };
      }

      if (!dependencyIds.current[signature]) {
        if (data[signature][DEFAULT_ID].result === ValidatedType.INVALID) {
          return {
            result: ValidatedType.INVALID,
            message: data[signature][DEFAULT_ID].message,
          };
        }
      } else {
        for (const id in dependencyIds.current[signature]) {
          if (data[signature][id].result === ValidatedType.INVALID) {
            return {
              result: ValidatedType.INVALID,
              message: data[signature][id].message,
            };
          }
        }
      }
    }

    return { result: ValidatedType.VALID };
  }, [data, validator]);

  // 특정 타입의 Validator는 하나일 수도 있고(='DEFAULT') 여러 개일 수도 있다.
  // 예를 들어, 특정 타입의 Validator를 가진 하위 컴포넌트가 여러 개 존재한다고 하자.
  // 이때, Validator에 특정 타입의 Validator를 의존한다고 설정한 경우
  // 어떤 하위 컴포넌트의 Validator에 의존해야 할 지 알 수 없을 것이다.
  // 따라서, 특정 하위 컴포넌트의 Validator에 의존하기 위해서는 그 Validator의 Id를 등록해야 한다.
  // 이때, 등록할 수 있는 Id는 여러 개일 수 있다. 이의 경우 해당하는 Id의 Validator에 모두 의존하게 되는 셈이다.
  const registerDependencyId = (props: AddDependencyIdProps) => {
    if (
      !(props.signature in validator.dependencies) ||
      props.signature === validator.signature
    ) {
      throw new Error();
    }

    if (!dependencyIds.current[props.signature]) {
      dependencyIds.current[props.signature] = [];
    }

    dependencyIds.current[props.signature] = dependencyIds.current[
      props.signature
    ].concat(props.id);
  };

  // validation 정보가 바뀔 때마다 업데이트된다.
  useLayoutEffect(() => {
    dependencyResult.current = accumulateDependencies();
  }, [accumulateDependencies]);

  return { validate, isValid, getMessage, registerDependencyId };
};

export { useValidation };
