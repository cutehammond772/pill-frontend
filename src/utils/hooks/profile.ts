import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { RootState } from "../reducers";
import * as reducer from "../reducers/profile";
import { ProfileData } from "../../components/profile/profile.avatar";

import { useAuth } from "./auth";
import { useRequest } from "./request";

import * as config from "../../config";
import { useRunOnce } from "./run-once";

// Loader 역할이란, 첫 번째 렌더링 시에 필요한 정보가 있을 때 외부에서 가져오는 역할을 의미한다.
const useProfile = (loader?: boolean) => {
  const dispatch = useDispatch();

  const auth = useAuth();
  const request = useRequest();

  const lockLoad = useRunOnce("useProfile:lockLoad");
  const lockUnload = useRunOnce("useProfile:lockUnload");

  // 현재 프로파일 데이터를 나타낸다.
  const data = useSelector((state: RootState) => state.profile);

  // 프로파일을 갱신한다. 이때 데이터가 유효하지 않으면 게스트 프로파일로 적용된다.
  const update = useCallback(
    (profile: Required<ProfileData>) =>
      dispatch(reducer.setToUser({...profile})),
    [dispatch]
  );

  // 프로파일을 삭제한다. 이후 게스트 프로파일로 변경된다.
  const remove = useCallback(() => dispatch(reducer.setToAnonymous()), [dispatch]);

  // 프로파일 정보를 백엔드 서버로부터 가져온다.
  const refresh = async () => {
    try {
      const user = await request.apiGet<Required<ProfileData>>(
        auth.axios,
        config.API_USER_PROFILE
      );

      // user는 무조건 userName, profileUrl 프로퍼티가 담긴 JSON 데이터여야 한다.
      update(user);
      console.log("[Profile] Loaded profile successfully.");
    } catch (ex) {
      remove();
      console.log("[Profile] Failed loading profile.");
    }
  };

  // useAuth Hook에서 인증 정보가 로드된 후 프로파일 정보가 갱신된다.
  useEffect(() => {
    if (auth.loaded && !!loader) {
      lockLoad.runOnce(refresh);
    }
  });

  // 로그아웃이 감지되면 프로파일 삭제도 연이어 수행한다.
  useEffect(() => {
    if (auth.loaded && !auth.authorized && !!loader) {
      lockUnload.runOnce(remove);
    }
  });

  return { data, update, remove, refresh };
};

export { useProfile };
