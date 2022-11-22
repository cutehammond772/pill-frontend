import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import {
  addRunOnce,
  removeRunOnce,
  resetRunOnce,
} from "../../reducers/run_once";

// 특정 행동을 리렌더링, 마운트/언마운트에 관계없이 단 한 번만 수행이 필요한 경우에 사용한다.
// runId라는 고유 ID를 사용하여 구분한다.
const useRunOnce = (runId: string) => {
  const dispatch = useDispatch();
  const isRun = useSelector((state: RootState) =>
    state.runOnce.runIds.includes(runId)
  );

  // 단 한 번만 실행되도록 한다.
  const runOnce = (callbackFn: () => void) => {
    if (!isRun) {
      dispatch(addRunOnce(runId));
      callbackFn();
    }
  };

  // 제한을 초기화한다.
  const reset = () => dispatch(removeRunOnce(runId));

  // 특정 패턴에 해당하는 runId를 모두 초기화한다.
  const resetAll = (regexp?: string) => {
    dispatch(resetRunOnce(regexp));
  };

  return { runOnce, reset, resetAll };
};

export { useRunOnce };
