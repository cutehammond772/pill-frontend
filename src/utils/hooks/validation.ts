import { useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { Actions as actions } from "../reducers/validation";

import {
  DomainValidator,
  ElementValidationTypes,
  ValidationErrorMessages,
  ValidationResponse,
  validatorID as getValidatorID,
} from "../validators/validator.type";

// 특정 컴포넌트에 대한 검증을 담당하는 Hook이다.
export const useValidation = <T>(validator: DomainValidator<T>) => {
  // 최소 의존 갯수를 음수로 설정한 경우 이는 유효하지 않다.
  if ((validator.minDependencies || 0) < 0) {
    throw new Error(
      "[useValidation] 의존해야 하는 Validator의 최소 갯수가 유효하지 않습니다."
    );
  }

  const dispatch = useDispatch();

  const removed = useRef<boolean>(false);

  // 이 Validator의 고유 ID를 나타낸다.
  // Validator 내의 ID는 같은 종류의 DomainValidator끼리 구분하기 위해 존재한다면,
  // 이 validatorID는 Validator 전역에서 사용한다.
  const validatorID = useRef<string>(
    getValidatorID(validator.signature, validator.id)
  );

  const validatorInfo = useSelector(
    (state: RootState) => state.validation.validators[validatorID.current]
  );

  const validation = useSelector((state: RootState) => state.validation.data[validatorID.current]);

  // 이 Validator를 삭제한다. 컴포넌트가 삭제될 때 같이 호출하도록 S한다.
  const remove = useCallback(() => {
    if (removed.current) {
      throw new Error("이미 삭제가 요청된 상태입니다.");
    }

    // 이 Validator의 모든 정보를 삭제한다.
    dispatch(actions.removeValidator({ validatorID: validatorID.current }));
    removed.current = true;
  }, [dispatch]);

  // 검증 결과 갱신을 요청한다.
  // 상위 Validator가 존재하는 경우 하위 Validator 목록에 추가한다.
  const commit = useCallback(
    (validation: ValidationResponse) => {
      if (removed.current) {
        return;
      }

      // 검증 결과를 저장한다.
      dispatch(
        actions.updateValidation({
          response: validation,
          validatorID: validatorID.current,
        })
      );
    },
    [dispatch]
  );

  // 이 DomainValidator의 검증을 수행한다.
  const validate = useCallback(
    (t: T) => {
      if (removed.current) {
        return;
      }

      const results = validator.validators.map((v) => v(t));
      const response: ValidationResponse = { valid: true, messages: [] };

      if (results.every((r) => r.type === ElementValidationTypes.PASS)) {
        // 모든 Validator가 'PASS'를 반환한 경우, 정해진 ALL_PASS 메시지와 함께 'INVALID'로 저장된다.
        response.valid = false;
        response.messages = [ValidationErrorMessages.ALL_PASSED];
      } else if (
        results.some((r) => r.type === ElementValidationTypes.INVALID)
      ) {
        response.valid = false;
        response.messages = results
          .filter((r) => r.type === ElementValidationTypes.INVALID)
          .map((r) => r.messages)
          .flat();
      }

      commit(response);
    },
    [commit, validator.validators]
  );

  // 맨 처음 Validator를 추가한다.
  useEffect(() => {
    if (!validatorInfo) {
      dispatch(
        actions.addValidator({
          data: {
            validatorID: validatorID.current,
            dependency: validator.dependency,
            minDependencies: validator.minDependencies,
          },
        })
      );
    }
  }, [dispatch, validator, validatorInfo]);

  return {
    validation,
    validate,
    remove,
    removed: removed.current,
  };
};
