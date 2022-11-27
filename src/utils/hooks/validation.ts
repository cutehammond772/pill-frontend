import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import * as reducer from "../reducers/validation";
import { ValidationContainer } from "../reducers/validation";
import {
  DomainValidator,
  ValidatedType,
  ValidationMessages,
  ValidationErrorMessages,
  UntypedValidationResponse,
  Validation,
  validatorID as getValidatorID,
} from "../validators/validator.type";

import * as Map from "../other/data-structure/index-signature-map";
import { useRunOnce } from "./run-once";

type Versions = { [validatorID: string]: Validation };

// 의존 Validator를 관리하는 Hook이다.
// 단독으로 쓰이지 않고 useValidation Hook과 같이 사용된다.
const useDependencies = () => {
  // 의존 Validator의 검증 결과의 캐시가 저장된 변수이다.
  const cacheDependencies = useRef<Versions>({});

  // 의존 Validator가 갱신된 이후 검증 결과를 모은다.
  // 이후 cacheResult를 통해 캐시된다.
  const cache = useRef<UntypedValidationResponse>();

  // 의존 Validator의 검증 결과를 모아 캐시한다.
  const cacheResult = useCallback(() => {
    // 검증 결과가 모두 'VALID'한지 확인한다.
    const valid = Object.keys(cacheDependencies.current).every(
      (validatorID) =>
        cacheDependencies.current[validatorID].result === ValidatedType.VALID
    );

    if (valid) {
      cache.current = {
        result: ValidatedType.VALID,
        messages: [],
      };
    } else {
      const messages = Object.keys(cacheDependencies.current).reduce(
        (acc, validatorID) =>
          acc.concat(cacheDependencies.current[validatorID].messages),
        [] as Array<string>
      );

      cache.current = {
        result: ValidatedType.INVALID,
        messages: messages,
      };
    }
  }, []);

  // 의존 Validator의 추가 또는 삭제를 반영한다. 
  const updateModified = useCallback(
    (dependencies: Array<string>, data: ValidationContainer) => {
      // 추가된 Validator 목록을 나타낸다.
      const added = dependencies.filter(
        (validatorID) => !cacheDependencies.current[validatorID]
      );
      cacheDependencies.current = Map.putAll(
        cacheDependencies.current,
        added.map((validatorID) => ({
          key: validatorID,
          value: {
            ...data[validatorID],
            messages: [...data[validatorID].messages],
          },
        }))
      );

      // 삭제된 Validator 목록을 나타낸다.
      const removed = dependencies.filter((validatorID) => !data[validatorID]);
      cacheDependencies.current = Map.removeAll(
        cacheDependencies.current,
        removed
      );

      // Validator 목록의 변경 여부를 나타낸다.
      const changed = removed.length + added.length !== 0;

      // 변경된 경우 검증 결과를 다시 모아 캐시한다.
      changed && cacheResult();
      return { removedDependencies: removed, isChanged: changed };
    },
    [cacheResult]
  );

  // 의존 Validator의 버전을 체크하여 최신 버전으로 검증 결과를 갱신한다.
  // 만약 의존성이 삭제되어 존재하지 않는 경우 넘어간다. (updateModified에서 처리된다.)
  const updateVersions = useCallback(
    (data: ValidationContainer) => {
      // 최신 버전으로 갱신이 필요한 의존 Validator의 수를 나타낸다.
      const count = Object.keys(cacheDependencies.current).filter(
        (validatorID) =>
          !!data[validatorID] &&
          data[validatorID].version >
            cacheDependencies.current[validatorID].version
      ).length;

      // 갱신이 필요하지 않을 경우
      if (count === 0) {
        return false;
      }

      cacheDependencies.current = Object.keys(cacheDependencies.current).reduce(
        (acc, validatorID) => {
          acc[validatorID] =
            !data[validatorID] ||
            data[validatorID].version ===
              cacheDependencies.current[validatorID].version
              ? cacheDependencies.current[validatorID]
              : {
                  ...data[validatorID],
                  messages: [...data[validatorID].messages],
                };

          return acc;
        },
        {} as Versions
      );

      // 갱신 이후 검증 결과를 모아 캐시한다.
      cacheResult();
      return true;
    },
    [cacheResult]
  );

  // 의존 Validator의 검증 결과를 모아 캐시한 데이터를 반환한다.
  const getResult = () => cache.current;

  // 현재 캐시된 의존 Validator의 갯수를 반환한다.
  const getCount = () => Object.keys(cacheDependencies.current).length;

  return {
    updateModified,
    updateVersions,
    getResult,
    getCount,
  };
};

// 특정 컴포넌트에 대한 검증을 담당하는 Hook이다. 
const useValidation = <T, E extends ValidationMessages>(
  validator: DomainValidator<T, E>
) => {
  // 최소 의존 갯수를 음수로 설정한 경우 이는 유효하지 않다.
  if ((validator.minDependencies || 0) < 0) {
    throw new Error(
      "[useValidation] 의존해야 하는 Validator의 최소 갯수가 유효하지 않습니다."
    );
  }

  // 이 Validator의 고유 ID를 나타낸다.
  // Validator 내의 ID는 같은 종류의 DomainValidator끼리 구분하기 위해 존재한다면,
  // 이 validatorID는 Validator 전역에서 사용한다.
  const validatorID = useRef<string>(
    getValidatorID(validator.signature, validator.id)
  );

  const dispatch = useDispatch();

  // 이 Validator의 의존성을 관리하는 Hook이다.
  const dependencies = useDependencies();

  // 이 Validator를 의존하는 Validator의 목록을 나타낸다.
  const listDependencies = useSelector(
    (state: RootState) => state.validation.dependencies[validatorID.current]
  );

  // 모든 검증 결과가 들어있는 데이터이다.
  const data = useSelector((state: RootState) => state.validation.data);

  // 이 Validator의 최종 검증 결과이다.
  // '의존 Validator의 검증 결과'와 '이 Validator 내 요소를 검증한 결과'를 합친 형태이다. 
  const result = useSelector(
    (state: RootState) => state.validation.data[validatorID.current]
  );

  // 필요한 때에만 이 Validator의 검증이 이루어질 수 있도록 잠그는 역할을 한다.
  const lockValidate = useRunOnce(`${validatorID.current}:lockValidate`);

  // 이 Validator가 상위 Validator의 의존성에 추가되었음을 상위 Validator에 알려야 하는데,
  // 이 과정은 이 Validator가 처음 검증 결과를 저장할 때 이루어진다.
  // 이때, 처음에만 이 과정을 수행하고 그 다음 저장부터는 생략하도록 잠그는 역할을 한다.
  const initOnce = useRunOnce(`${validatorID.current}:initOnce`);

  // 이 Validator가 재검증이 필요한 여부를 나타낸다.
  // 다른 Validator에서 이 Validator의 validatorID를 알고 있을 때 재검증 요청을 보낼 수 있다.
  const refresh = useSelector((state: RootState) =>
    state.validation.refresh.includes(validatorID.current)
  );

  // 검증이 필요할 때 잠금을 푼다.
  const needValidate = useCallback(() => lockValidate.reset(), [lockValidate]);

  // 검증이 필요할 때 특정 키워드에 해당하는 잠금을 푼다.
  const needValidateAll = useCallback(
    (keyword: string) =>
      lockValidate.resetAll(
        `^[a-zA-Z0-9\\.\\-_:]*(${keyword})[a-zA-Z0-9\\.\\-_:]*:lockValidate$`
      ),
    [lockValidate]
  );

  // 다른 Validator에 재검증을 요청한다.
  const refreshValidator = useCallback(
    (validatorID: string) => dispatch(reducer.addRefresh({ validatorID })),
    [dispatch]
  );

  // 재검증 요청이 들어왔을 때 검증 제한을 푼다.
  useEffect(() => {
    if (!removed.current && refresh) {
      lockValidate.reset();
      dispatch(reducer.removeRefresh({ validatorID: validatorID.current }));
    }
  }, [dispatch, refresh, lockValidate]);

  // 이 Validator 내 요소를 검증한 결과의 캐시가 저장된 변수이다.
  const cache = useRef<UntypedValidationResponse>();

  // 이 Validator를 가지는 컴포넌트가 삭제되었을 때, 사이드 이펙트로 인해 redux에 무언가가 저장되는 것을 막기 위한 역할이다.
  const removed = useRef<boolean>(false);

  // 이 Validator를 삭제한다. 컴포넌트가 삭제될 때 같이 호출하도록 한다.
  const remove = useCallback(() => {
    if (removed.current) {
      throw new Error("이미 삭제가 요청된 상태입니다.");
    }

    // 이 Validator의 모든 정보를 삭제한다.
    dispatch(reducer.removeValidation({ validatorID: validatorID.current }));

    // runOnce 정보를 삭제한다.
    lockValidate.reset();
    initOnce.reset();

    // 상위 Validator에 재검증을 요청한다. (이 Validator가 삭제되었으므로)
    if (validator.dependency !== undefined) {
      refreshValidator(validator.dependency);
    }

    // 의존 Validator를 모두 삭제한다.
    listDependencies?.forEach((validatorID) =>
      dispatch(reducer.removeValidation({ validatorID }))
    );

    removed.current = true;
  }, [
    dispatch,
    refreshValidator,
    validator,
    listDependencies,
    initOnce,
    lockValidate,
  ]);

  // 검증 결과를 redux container에 저장한다.
  // 상위 Validator가 존재하는 경우 의존 목록에 추가한다.
  const commit = useCallback(
    (validation: UntypedValidationResponse) => {
      if (removed.current) {
        return;
      }

      // 검증 결과를 저장한다.
      dispatch(
        reducer.addValidation({ validation, validatorID: validatorID.current })
      );

      // 처음에 단 한 번만 실행된다.
      initOnce.runOnce(() => {
        // 상위 Validator가 존재하는 경우
        if (validator.dependency !== undefined) {
          // 상위 Validator에 의존성을 추가한다.
          dispatch(
            reducer.addDependency({
              validatorID: validator.dependency,
              dependedValidatorID: validatorID.current,
            })
          );

          // 상위 Validator에 재검증을 요청한다.
          refreshValidator(validator.dependency);
        }
      });
    },
    [dispatch, validator, initOnce, refreshValidator]
  );

  // 의존 Validator의 검증 결과와 이 Validator의 검증 결과를 모은 뒤 저장한다. 
  const combine = useCallback(() => {
    if (removed.current) {
      return;
    }

    // 의존을 허용하지 않은 경우
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

    const depencenciesResult = dependencies.getResult();

    // 의존하고 있는 하위 Validator의 검증 결과가 나오지 않은 경우
    if (!depencenciesResult) {
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
      depencenciesResult.result === ValidatedType.VALID
    ) {
      commit({ result: ValidatedType.VALID, messages: [] });
      return;
    }

    commit({
      result: ValidatedType.INVALID,
      messages: cache.current.messages.concat(depencenciesResult.messages),
    });
  }, [dependencies, commit, validator]);

  // 이 Validator의 검증을 수행한다. 
  const validate = useCallback(
    (t: T) => {
      if (removed.current) {
        return;
      }

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
      });
    },
    [combine, validator, lockValidate]
  );

  // 의존 Validator의 검증 결과가 갱신되었을 때 합치는 과정을 수행한다.
  useEffect(() => {
    if (removed.current || validator.minDependencies === undefined) {
      return;
    }

    const updated = dependencies.updateVersions(data);

    updated && combine();
  }, [data, dependencies, validator, combine]);

  // 의존성 추가 또는 삭제를 반영한다.
  useEffect(() => {
    if (
      removed.current ||
      validator.minDependencies === undefined ||
      listDependencies === undefined
    ) {
      return;
    }

    const { removedDependencies, isChanged } = dependencies.updateModified(
      listDependencies,
      data
    );

    isChanged && combine();

    removedDependencies.length !== 0 &&
      dispatch(
        reducer.removeDependency({
          validatorID: validatorID.current,
          dependencies: removedDependencies,
        })
      );
  }, [dispatch, data, combine, listDependencies, dependencies, validator]);

  return {
    validation: result,
    needValidate,
    needValidateAll,
    validate,
    refreshValidator,
    remove,
  };
};

export { useValidation };
