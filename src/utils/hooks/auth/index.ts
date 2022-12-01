import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";

import { Actions as actions } from "../../reducers/auth";
import { instance } from "../../sagas/auth";

export const useAuth = () => {
  const dispatch = useDispatch();

  // 백엔드 서버로부터 인증 정보를 가져온(= 로드한) 여부를 나타낸다. (실패하여도 로드되었다고 간주한다.)
  const loaded = useSelector((state: RootState) => state.auth.loaded);

  // 인증 정보를 성공적으로 가져온 여부를 나타낸다.
  const authorized = useSelector((state: RootState) => state.auth.authorized);

  // 현재 인증된 상태일 때, 로그아웃을 진행한다.
  const logout = useCallback(() => {
    if (!(loaded && authorized)) {
      throw new Error("로그아웃은 인증된 상태에서만 진행할 수 있습니다.");
    }

    dispatch(actions.logout());
  }, [loaded, authorized, dispatch]);

  return {
    axios: instance,
    authorized,
    loaded,
    logout,
  };
};
