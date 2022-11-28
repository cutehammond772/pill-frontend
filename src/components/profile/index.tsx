import { useState } from "react";
import { ProfileAvatar } from "./profile.avatar";
import { ProfilePointInfo } from "./profile.point-info";
import { ProfileTab } from "./tab";

import * as Style from "./profile.style";
import { useAuth } from "../../utils/hooks/auth";

const Profile = () => {
  const auth = useAuth();
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <>
      <Style.Profile>
        {auth.authorized && <ProfilePointInfo point={30000} />}
        <ProfileAvatar onClick={() => setChecked(!checked)} />
      </Style.Profile>

      <ProfileTab checked={checked} onClose={() => setChecked(false)} />
    </>
  );
};

export { Profile };
