import { useState } from "react";
import ProfileAvatar from "./profile.avatar";
import { ProfilePointInfo } from "./profile.point-info";
import { ProfileTab } from "./tab";

import * as Style from "./profile.style";
import { useAuth } from "../../utils/hooks/auth";

const Profile = () => {
  const auth = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Style.Profile>
        {auth.authorized && <ProfilePointInfo point={30000} />}
        <ProfileAvatar onClick={() => setOpen(!open)} />
      </Style.Profile>

      <ProfileTab open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export { Profile };
