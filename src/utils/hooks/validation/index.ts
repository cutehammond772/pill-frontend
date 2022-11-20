import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import * as reducer from "../../reducers/validation";
import { ValidationContainer } from "../../reducers/validation/validation.type";
import {
  DomainValidator,
  ValidatedType,
  ValidationMessages,
  ValidationErrorMessages,
  UntypedValidationResponse,
  Validation,
  validatorID as getValidatorID,
} from "../../validators/validator.type";

import * as Map from "../../other/index_signature";
import { useRunOnce } from "../run_once";

type Versions = { [validatorID: string]: Validation };

// 의존하고 있는 하위 Validator를 관리하는 Hook이다.
// 단독으로 쓰이지 않고 useValidation 내부에서 사용된다.
const useDependencies = () => {
  // 의존하고 있는 하위 Validator의 검증 결과의 캐시 변수이다.
  // 검증 결과의 업데이트(= updateLatestVersions) 또는 Validator의 추가/삭제(= updateModified)에 대응된다.
  const versions = useRef<Versions>({});

  // 위의 업데이트 이후 검증 결과를 모아 이 캐시에 저장된다.
  const cache = useRef<UntypedValidationResponse>();

  // 의존하고 있는 Validator의 검증 결과를 모아 캐시한다.
  const accumulate = useCallback(() => {
    const valid = Object.keys(versions.current).every(
      (validatorID) =>
        versions.current[validatorID].result === ValidatedType.VALID
    );

    if (valid) {
      cache.current = {
        result: ValidatedType.VALID,
        messages: [],
      };
    } else {
      const messages = Object.keys(versions.current).reduce(
        (acc, validatorID) =>
          acc.concat(versions.current[validatorID].messages),
        [] as Array<string>
      );

      cache.current = {
        result: ValidatedType.INVALID,
        messages: messages,
      };
    }
  }, []);

  // 의존하고 있는 하위 Validator의 추가/삭제를 감지하여 versions를 자동으로 수정한다.
  const updateModified = useCallback(
    (dependencies: Array<string>, data: ValidationContainer) => {
      const added = dependencies.filter(
        (validatorID) => !versions.current[validatorID]
      );

      versions.current = Map.putAll(
        versions.current,
        added.map((validatorID) => ({
          key: validatorID,
          // Copy Validation
          value: {
            ...data[validatorID],
            messages: [...data[validatorID].messages],
          },
        }))
      );

      const removed = dependencies.filter((validatorID) => !data[validatorID]);
      versions.current = Map.removeAll(versions.current, removed);

      const changed = removed.length + added.length !== 0;
      changed && accumulate();
      return { removed: removed, changed: changed };
    },
    [accumulate]
  );

  // 의존하고 있는 하위 Validator의 버전을 체크하여 각각의 검증 결과를 업데이트한다.
  // 만약 하위 Validator가 삭제되어 존재하지 않는 경우 넘어간다. (이는 updateModified에서 처리)
  const updateLatestVersions = useCallback(
    (data: ValidationContainer) => {
      const count = Object.keys(versions.current).filter(
        (validatorID) =>
          !!data[validatorID] &&
          data[validatorID].version > versions.current[validatorID].version
      ).length;

      if (count === 0) {
        return false;
      }

      versions.current = Object.keys(versions.current).reduce(
        (acc, validatorID) => {
          acc[validatorID] =
            !data[validatorID] ||
            data[validatorID].version === versions.current[validatorID].version
              ? versions.current[validatorID]
              : {
                  ...data[validatorID],
                  messages: [...data[validatorID].messages],
                };

          return acc;
        },
        {} as Versions
      );

      accumulate();
      return true;
    },
    [accumulate]
  );

  // 의존하고 있는 하위 Validator의 검증 결과를 모아 캐시한 데이터를 반환한다.
  const getResult = () => cache.current;
  const getCount = () => Object.keys(versions.current).length;

  return {
    updateModified,
    updateLatestVersions,
    getResult,
    getCount,
  };
};

const useValidation = <T, E extends ValidationMessages>(
  validator: DomainValidator<T, E>
) => {
  // 최소 의존 갯수를 음수로 설정한 경우
  if ((validator.minDependencies || 0) < 0) {
    throw new Error();
  }

  // 이 Validator의 고유 ID를 나타낸다.
  // Validator 내의 ID는 같은 종류의 DomainValidator끼리 구분하기 위해 존재한다면,
  // 이 validatorID는 Validator 전역에서 사용한다.
  const validatorID = useRef<string>(
    getValidatorID(validator.signature, validator.id)
  );

  const dispatch = useDispatch();
  const dependencies = useDependencies();

  const depValidators = useSelector(
    (state: RootState) => state.validation.dependencies[validatorID.current]
  );

  // 의존성까지 모두 포함된 Validator의 검증 결과이다.
  const result = useSelector(
    (state: RootState) => state.validation.data[validatorID.current]
  );

  const lockValidate = useRunOnce();
  const initOnce = useRunOnce();

  const data = useSelector((state: RootState) => state.validation.data);

  // 이 Validator가 재검증이 필요한 여부를 나타낸다.
  // 다른 Validator에서 이 Validator의 validatorID를 알고 있을 때 재검증 요청을 보낼 수 있다.
  const refresh = useSelector((state: RootState) =>
    state.validation.refresh.includes(validatorID.current)
  );

  const needValidate = useCallback(() => lockValidate.reset(), [lockValidate]);

  // 다른 Validator에 재검증을 요청한다.
  const refreshValidator = useCallback(
    (validatorID: string) => dispatch(reducer.addRefresh(validatorID)),
    [dispatch]
  );

  // 재검증 요청이 들어왔을 때 검증 제한을 푼다.
  useEffect(() => {
    if (!removed.current && refresh) {
      lockValidate.reset();
      dispatch(reducer.removeRefresh(validatorID.current));
    }
  }, [dispatch, refresh, lockValidate]);

  // 이 Validator 자체의 검증 결과를 저장하는 데 사용된다.
  const cache = useRef<UntypedValidationResponse>();

  // 이 Validator를 가지는 컴포넌트가 삭제되었을 때, redux container에 무언가가 저장되는 것을 막기 위한 역할이다.
  const removed = useRef<boolean>(false);

  // 이 Validator를 삭제한다. 컴포넌트가 삭제될 때 같이 호출한다.
  const remove = useCallback(() => {
    dispatch(reducer.removeValidation(validatorID.current));

    if (validator.dependency !== undefined) {
      refreshValidator(validator.dependency);
    }

    depValidators.forEach((validatorID) =>
      dispatch(reducer.removeValidation(validatorID))
    );

    removed.current = true;
  }, [dispatch, refreshValidator, validator, depValidators]);

  // 모든 검증 결과를 모은 뒤 redux container에 저장한다.
  // 의존하는 상위 Validator가 존재하는 경우 의존 목록에 추가한다.
  // 이 Validator를 가지는 컴포넌트가 삭제된 경우 저장되지 않는다.
  const commit = useCallback(
    (validation: UntypedValidationResponse) => {
      if (removed.current) {
        return;
      }

      dispatch(reducer.addValidation(validation, validatorID.current));

      if (validator.dependency !== undefined) {
        dispatch(
          reducer.addDependency(validator.dependency, validatorID.current)
        );

        initOnce.runOnce(() => {
          if (validator.dependency !== undefined) {
            refreshValidator(validator.dependency);
          }
        });
      }
    },
    [dispatch, validator, initOnce, refreshValidator]
  );

  // 이 Validator의 검증 결과를 모은다.
  const combine = useCallback(() => {
    // 하위 Validator의 의존을 허용하지 않은 경우
    if (validator.minDependencies === undefined) {
      // 아직 이 Validator의 검증 결과가 나오지 않은 경우
      if (!cache.current) {
        commit({
          result: ValidatedType.INVALID,
          messages: [ValidationErrorMessages.NOT_VALIDATED],
        });
        return;
      }

      // 이 Validator의 검증 결과만 저장한다.
      commit(cache.current);
      return;
    }

    const dep = dependencies.getResult();

    // 의존하고 있는 하위 Validator의 검증 결과가 나오지 않은 경우
    if (!dep) {
      commit({
        result: ValidatedType.INVALID,
        messages: [ValidationErrorMessages.DEPENDENCIES_NOT_VALIDATED],
      });
      return;
    }

    // 의존 갯수가 최소 갯수보다 적은 경우
    if (dependencies.getCount() < validator.minDependencies) {
      commit({
        result: ValidatedType.INVALID,
        messages: [ValidationErrorMessages.DEPENDENCIES_LACK],
      });
      return;
    }

    // 아직 이 Validator의 검증 결과가 나오지 않은 경우
    if (!cache.current) {
      commit({
        result: ValidatedType.INVALID,
        messages: [ValidationErrorMessages.NOT_VALIDATED],
      });
      return;
    }

    // 모두 'VALID'인 경우
    if (
      cache.current.result === ValidatedType.VALID &&
      dep.result === ValidatedType.VALID
    ) {
      commit({ result: ValidatedType.VALID, messages: [] });
      return;
    }

    commit({
      result: ValidatedType.INVALID,
      messages: cache.current.messages.concat(dep.messages),
    });
  }, [dependencies, commit, validator]);

  // 이 Validator의 검증을 수행한다.
  const validate = useCallback(
    (t: T) =>
      lockValidate.runOnce(() => {
        let domainResult;
        const results = validator.validators.map((v) => v(t));

        if (results.every((r) => r.result === ValidatedType.PASS)) {
          // 모든 Validator가 'PASS'를 반환한 경우, 정해진 ALL_PASS 메시지와 함께 'INVALID'로 저장된다.
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

        cache.current = domainResult;
        combine();
      }),
    [combine, validator, lockValidate]
  );

  // 의존하고 있는 하위 Validator의 검증 결과 업데이트 감지
  useEffect(() => {
    if (validator.minDependencies === undefined) {
      return;
    }

    const updated = dependencies.updateLatestVersions(data);
    updated && combine();
  }, [data, dependencies, validator, combine]);

  // 의존성 추가 및 삭제 감지
  useEffect(() => {
    if (
      validator.minDependencies === undefined ||
      depValidators === undefined
    ) {
      return;
    }

    const { removed, changed } = dependencies.updateModified(
      depValidators,
      data
    );

    changed && combine();

    removed.length !== 0 &&
      dispatch(reducer.removeDependency(validatorID.current, removed));
  }, [dispatch, data, combine, depValidators, dependencies, validator]);

  return {
    validation: result,
    needValidate,
    validate,
    refreshValidator,
    remove,
  };
};

export { useValidation };
