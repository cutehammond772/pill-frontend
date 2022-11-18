import { useState } from "react";
import { ProfileAvatar } from "./profile.avatar";
import { ProfilePointInfo } from "./profile.point_info";
import { ProfileTab } from "./tab";

import { useProfile } from "../../utils/hooks/profile";
import * as Style from "./profile.style";

import { INITIAL_STATE } from "../../utils/reducers/profile/profile.type";

const Profile = () => {
  const profile = useProfile();
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <>
      <Style.Container>
        {(profile.data !== INITIAL_STATE) && <ProfilePointInfo point={30000} />}
        <ProfileAvatar onClick={() => setChecked(!checked)} />
      </Style.Container>

      <ProfileTab checked={checked} onClose={() => setChecked(false)} />
    </>
  );
};

export { Profile };
