import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { RootState } from "../../reducers";
import { updateProfile, removeProfile } from "../../reducers/profile";
import { ProfileData } from "../../../components/profile/profile.type";

import { useAuth } from "../auth";
import { useRequest } from "../request";

import * as config from "../../../config";
import { useOnce } from "../once";

// Loader 역할이란, 첫 번째 렌더링 시에 필요한 정보가 있을 때 외부에서 가져오는 역할을 의미한다.
const useProfile = (loader?: boolean) => {
  const dispatch = useDispatch();

  const auth = useAuth();
  const request = useRequest();

  const attemptLoad = useOnce("load.profile");
  const attemptUnload = useOnce("unload.profile");

  // 현재 프로파일 반환
  const data = useSelector((state: RootState) => state.profile);

  // 프로파일 업데이트(= 등록) -> 프로파일 값이 없으면 remove
  const update = useCallback(
    (profile?: ProfileData) =>
      dispatch(!!profile ? updateProfile(profile) : removeProfile()),
    [dispatch]
  );

  // 프로파일 삭제 -> Guest Profile로 변경
  const remove = useCallback(() => dispatch(removeProfile()), [dispatch]);

  // 프로파일 정보를 백엔드로부터 가져온다.
  const refresh = async () => {
    try {
      const user = await request.apiGet<ProfileData>(
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
      attemptLoad.attemptOnce(refresh);
    }
  });

  // 로그아웃이 감지되면 프로파일 삭제도 연이어 수행한다.
  useEffect(() => {
    if (auth.loaded && !auth.authenticated && !!loader) {
      attemptUnload.attemptOnce(remove);
    }
  });

  return { data, update, remove, refresh };
};

export { useProfile };
