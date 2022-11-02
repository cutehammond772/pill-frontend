import { useEffect, useState } from "react";

import * as config from "../../config";

import { ProfileData } from "./profile.type";
import { ProfileAvatar } from "./profile.avatar";
import { ProfilePointInfo } from "./profile.point_info";
import { ProfileTab } from "./tab";

import { useProfile } from "../../utils/hooks/profile";
import { INITIAL_STATE } from "../../utils/reducers/profile/reducer.profile.type";
import { useAuth } from "../../utils/hooks/auth";
import { useRequest } from "../../utils/hooks/request";

import { ContainerStyle } from "./profile.style";

const Profile = () => {
  const profile = useProfile();
  const auth = useAuth();
  const request = useRequest(auth);

  // 현재는 첫 로드 (새로고침, 리다이렉트) 때에만 프로필을 업데이트하도록 구현했다. 이후 로직 수정이 필요하다.
  useEffect(() => {
    const init = async () => {
      try {
        if (!auth.authenticated) {
          const success = await auth.authenticate();

          if (!success) throw new Error();
        }

        // user는 무조건 userName, profileUrl 프로퍼티가 담긴 JSON 데이터여야 한다.
        const user = await request.apiGet<ProfileData>(config.API_USER_PROFILE);
        profile.update(user);

        console.log("[Profile] Fetched profile successfully.");
      } catch (e) {
        profile.remove();

        console.log("[Profile] Failed loading profile.");
      }
    };

    if (profile.data === INITIAL_STATE) init();
  }, [profile, auth, request]);

  const [checked, setChecked] = useState<boolean>(false);

  // state 변경 함수는 람다식으로 한번 감싸주어야 한다.
  return (
    <>
      <ContainerStyle>
        {!!profile.data.profile && <ProfilePointInfo point={30000}/>}
        <ProfileAvatar
          onClick={() => {
            if (profile.data.inited) {
              setChecked(!checked);
            }
          }}
        />
      </ContainerStyle>

      <ProfileTab checked={checked} />
    </>
  );
};

export default Profile;
