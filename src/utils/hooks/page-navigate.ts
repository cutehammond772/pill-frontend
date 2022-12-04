import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PAGE_NAVIGATION_LOCKED,
  Actions as actions,
} from "../reducers/page/navigate";
import { Actions as events } from "../reducers/page/event";

export const usePageNavigate = () => {
  const navigateFn = useNavigate();
  const dispatch = useDispatch();
  const lock = useSelector(PAGE_NAVIGATION_LOCKED);

  const setLocked = useCallback(
    (locked: boolean) => {
      if (lock && locked) {
        return;
      }

      dispatch(locked ? actions.lockNavigate() : actions.unlockNavigate());
    },
    [dispatch, lock]
  );

  const back = useCallback(() => {
    if (!lock) {
      navigateFn(-1);
    }

    // 페이지 이동 시도를 다른 Saga 로직에서 캐치하기 위해 사용한다.
    dispatch(events.attemptNavigation());
  }, [dispatch, navigateFn, lock]);

  const navigate = useCallback(
    (to: string, replace?: boolean) => {
      if (!lock) {
        navigateFn(to, { replace: replace });
      }

      // 페이지 이동 시도를 다른 Saga 로직에서 캐치하기 위해 사용한다.
      dispatch(events.attemptNavigation());
    },
    [dispatch, navigateFn, lock]
  );

  return { locked: lock, setLocked, navigate, back };
};
