import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import {
  addRefreshValidator,
  registerValidation,
  removeRefreshValidator,
  updateValidation,
} from "../../reducers/validation";
import { StoredValidationResult } from "../../reducers/validation/validation.type";
import {
  DEFAULT_ID,
  DomainValidator,
  ValidatedType,
  ValidationMessages,
  ValidationErrorMessages,
} from "../../validators/validator.type";
import { useOnce } from "../once";

const useValidation = <T, E extends ValidationMessages>(
  validator: DomainValidator<T, E>
) => {
  const vid = `${validator.signature}:${validator.id || DEFAULT_ID}`;

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.validation.data);
  const refresh = useSelector((state: RootState) =>
    state.validation.refresh.includes(vid)
  );

  const dependencyIds = useRef<{ [signature: string]: Array<string> }>({});
  const dependencyResult = useRef<StoredValidationResult>();

  // 해결해야 할 것:
  // 1. 하위 의존성 확인할 때 그 의존 Validator의 정보는 그 의존 Validator의 의존성이 반영되지 않는다.
  // 2. 의존하는 하위 컴포넌트가 변경될 때 Id 또한 계속 반영되어야 한다. (완료)

  const validateLock = useOnce(vid);

  // useValidation Hook 생성 시, redux container에 해당 validator의 signature가 존재하지 않으면 새로 생성한다.
  if (!data[validator.signature]) {
    dispatch(registerValidation({ signature: validator.signature }));
  }

  /** result를 토대로 검증 정보를 업데이트한다. */
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

  // 이 DomainValidator의 검증 결과와 의존하는 Validator의 검증 결과를 합친다.
  const combine = useCallback(
    (domainResult: StoredValidationResult) => {
      if (!dependencyResult.current) {
        update({
          result: ValidatedType.INVALID,
          messages: [ValidationErrorMessages.DEPENDENCIES_NOT_CHECKED],
        });
        return;
      }

      if (
        domainResult.result === ValidatedType.VALID &&
        dependencyResult.current.result === ValidatedType.VALID
      ) {
        update({ result: ValidatedType.VALID, messages: [] });
        return;
      }

      update({
        result: ValidatedType.INVALID,
        messages: domainResult.messages.concat(
          dependencyResult.current.messages
        ),
      });
    },
    [update]
  );

  // 강제로 다른 Validator의 재검증이 필요할 때 호출한다.
  const forceRefresh = (props: { id?: string; signature: string }) =>
    dispatch(addRefreshValidator(props));

  const needValidate = useCallback(() => validateLock.reset(), [validateLock]);

  // 특정 타입의 데이터를 받아 검증 과정을 진행한다.
  // 리렌더링할 때 검증하는 경우 무한 루프를 방지하기 위해 추가로 Lock을 걸어 놓았다.
  // 즉 처음 한 번만 실행하고 그 이후로는 Unlock 전까지 검증이 실행되지 않는다.
  // 따라서 재검증이 필요할 때만 Lock을 풀면 되는데, 이때 needValidate()를 호출하면 된다.
  const validate = useCallback(
    (t: T) =>
      validateLock.attemptOnce(() => {
        let domainResult;
        const results = validator.validators.map((v) => v(t));
        if (results.every((r) => r.result === ValidatedType.PASS)) {
          // 모든 validator가 'PASS'를 반환한 경우, 정해진 ALL_PASS 메시지와 함께 'INVALID'로 저장된다.
          domainResult = {
            result: ValidatedType.INVALID,
            messages: [ValidationErrorMessages.ALL_PASSED],
          };
        } else if (results.some((r) => r.result === ValidatedType.INVALID)) {
          domainResult = {
            result: ValidatedType.INVALID,
            messages: results
              .filter((r) => r.result === ValidatedType.INVALID)
              .map((r) => r.messages)
              .flat(),
          };
        } else {
          // 모든 Validator의 반환 값이 'VALID' 또는 'PASS'이면 'VALID'로 저장된다.
          domainResult = { result: ValidatedType.VALID, messages: [] };
        }

        combine(domainResult);
      }),
    [validator, validateLock, combine]
  );

  // 이 도메인 Validator의 Validation 결과가 Valid인지 확인한다.
  // 이때, 의존하는 Validator까지 모두 고려한다는 점에 유의한다.
  const isValid = useCallback(() => {
    if (!data[validator.signature]) {
      return false;
    }

    if (validator.dependencies.length !== 0) {
      if (
        // DEPENDENCIES_NOT_CHECKED
        !dependencyResult.current ||
        // 'INVALID'한 의존하는 Validator가 존재할 때
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

  // 이 DomainValidator의 Validation 결과 메시지 목록을 나타낸다.
  // 이 DomainValidator의 Validation 결과가 'VALID'이지만 의존하는 Validators가 'INVALID'이면
  // 결국 'INVALID'이므로, 메시지는 'INVALID'한 의존하는 Validators의 메시지를 반환한다.
  const getMessages = useCallback(() => {
    if (!data[validator.signature]) {
      return undefined;
    }

    const messages = [
      ...data[validator.signature][validator.id || DEFAULT_ID].messages,
    ];

    if (validator.dependencies.length !== 0) {
      if (!dependencyResult.current) {
        return [ValidationErrorMessages.DEPENDENCIES_NOT_CHECKED];
      }

      if (dependencyResult.current.result === ValidatedType.INVALID) {
        if (
          data[validator.signature][validator.id || DEFAULT_ID].result ===
          ValidatedType.VALID
        ) {
          return messages.concat(dependencyResult.current.messages);
        }
      }
    }

    return messages;
  }, [data, validator]);

  // 의존하는 Validators의 Validation 결과를 모은다.
  const accumulateDependencies = useCallback(() => {
    if (validator.dependencies.find((signature) => !data[signature])) {
      return {
        result: ValidatedType.INVALID,
        messages: [ValidationErrorMessages.DEPENDENCY_NOT_REGISTERED],
      };
    }

    const defaultMessages = validator.dependencies
      .filter(
        (signature) =>
          !dependencyIds.current[signature] &&
          data[signature][DEFAULT_ID].result === ValidatedType.INVALID
      )
      .reduce(
        (acc, signature) => acc.concat(data[signature][DEFAULT_ID].messages),
        [] as Array<string>
      );

    const idMessages = validator.dependencies
      .filter((signature) => !!dependencyIds.current[signature])
      .map((signature) =>
        dependencyIds.current[signature].map(
          (id) => data[signature][id].messages
        )
      )
      .flat()
      .flat();

    if (defaultMessages.length + idMessages.length > 0) {
      return {
        result: ValidatedType.INVALID,
        messages: defaultMessages.concat(idMessages),
      };
    } else {
      return { result: ValidatedType.VALID, messages: [] };
    }
  }, [data, validator]);

  // 특정 타입의 Validator는 하나일 수도 있고(='DEFAULT') 여러 개일 수도 있다.
  // 예를 들어, 특정 타입의 Validator를 가진 하위 컴포넌트가 여러 개 존재한다고 하자.
  // 이때, Validator에 특정 타입의 Validator를 의존한다고 설정한 경우
  // 어떤 하위 컴포넌트의 Validator에 의존해야 할 지 알 수 없을 것이다.
  // 따라서, 특정 하위 컴포넌트의 Validator에 의존하기 위해서는 그 Validator의 Id를 등록해야 한다.
  // 이때, 등록할 수 있는 Id는 여러 개일 수 있다. 이의 경우 해당하는 Id의 Validator에 모두 의존하게 되는 셈이다.
  const updateDependencyIds = useCallback(
    (props: { signature: string; ids: Array<string> }) => {
      if (
        !validator.dependencies.find(
          (dependency) => dependency === props.signature
        ) ||
        props.signature === validator.signature
      ) {
        throw new Error();
      }
      dependencyIds.current[props.signature] = [...props.ids];
    },
    [validator]
  );

  // validation 정보가 바뀔 때마다 업데이트된다.
  useEffect(() => {
    dependencyResult.current = accumulateDependencies();
  }, [data, accumulateDependencies]);

  // 다른 Validator에 의해 강제로 재검증이 필요할 때 Unlock 시킨다.
  useEffect(() => {
    if (refresh) {
      needValidate();
      dispatch(
        removeRefreshValidator({
          id: validator.id,
          signature: validator.signature,
        })
      );
    }
  }, [dispatch, refresh, needValidate, validator]);

  return {
    forceRefresh,
    validate,
    needValidate,
    isValid,
    getMessages,
    updateDependencyIds,
  };
};

export { useValidation };
