import { useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { Actions as actions } from "../reducers/validation";

import {
  Validator,
  ElementValidationTypes,
  ValidationResponse,
  initialValidatorResponse,
  Validation,
} from "../validators/validator.type";

// 특정 컴포넌트에 대한 검증을 담당하는 Hook이다.
// 하나의 Validator는 '반드시' 하나의 컴포넌트에만 할당해야 한다.
export const useValidation = <T>(validator: Validator<T>) => {
  const dispatch = useDispatch();

  const inited = useRef<boolean>(false);
  const removed = useRef<boolean>(false);

  const { validatorID } = validator;

  // Redux store에 저장된 검증 데이터이다.
  const validation = useSelector(
    (state: RootState) => state.validation.data[validatorID]
  );

  const validatorInfo = useSelector(
    (state: RootState) => state.validation.validators[validatorID]
  );

  // 각 요소의 검증 결과를 캐시한다.
  // 디스패치 시에는 각 요소의 검증 결과를 합산한다.
  const cache = useRef<ValidationResponse>(initialValidatorResponse(validator));

  // 이 Validator를 삭제한다. 컴포넌트가 삭제될 때 같이 호출되도록 한다.
  const remove = useCallback(() => {
    if (removed.current) {
      throw new Error("이미 삭제가 요청된 상태입니다.");
    }

    // 이 Validator의 모든 정보를 삭제한다.
    dispatch(actions.removeValidator({ validatorID: validatorID }));
    removed.current = true;
  }, [dispatch, validatorID]);

  // 검증 결과 갱신을 요청한다.
  const commit = useCallback(() => {
    if (removed.current) {
      return;
    }

    const validation: Validation = {
      valid: cache.current.valid,
      messages: Object.values(cache.current.elements)
        .map((response) => response.messages)
        .flat(),
    };

    // 검증 결과를 저장한다.
    dispatch(
      actions.updateValidation({
        validation: validation,
        validatorID: validatorID,
      })
    );
  }, [dispatch, validatorID]);

  // 이 DomainValidator의 검증을 수행한다.
  const validate = useCallback(
    (element: T) => {
      if (removed.current) {
        return;
      }

      // 모든 ElementValidator에 대해 검증을 시도한다.
      const responses = Object.keys(validator.validators).map((key) => ({
        signature: key,
        ...validator.validators[key](element),
      }));

      // 수정*
      // 요소 검증 결과를 나타낸다.
      const response = responses.find(
        (response) => response.type !== ElementValidationTypes.EMPTY
      );

      if (!response) {
        throw new Error(
          "[useValidation] 검증 요청 대상인 특정한 요소를 검증하는 ElementValidator가 존재하지 않습니다."
        );
      }

      // 특정 요소에 대해 검증 결과를 캐시에 갱신한다.
      cache.current.elements[response.signature] = {
        type: response.type,
        messages: response.messages,
      };

      cache.current.valid = Object.values(cache.current.elements).every(
        (response) => response.type === ElementValidationTypes.VALID
      );

      // 캐시된 검증 결과를 Redux store에 반영한다.
      commit();
    },
    [commit, validator.validators]
  );

  // 맨 처음 로드 시 Validator를 추가한다.

  useEffect(() => {
    if (!inited.current) {
      if (!validatorInfo) {
        dispatch(
          actions.registerValidator({
            validatorID,
            data: {
              validatorID,
              top: validator.top,
              subPattern: validator.subPattern,
            },
          })
        );
      }
      inited.current = true;
    }
  }, [dispatch, validator, validatorID, validatorInfo]);

  return {
    validation,
    validate,
    remove,
    removed: removed.current,
  };
};
