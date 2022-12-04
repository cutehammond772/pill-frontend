import { useState } from "react";
import ProfileAvatar from "./profile.avatar";
import { ProfileTab } from "./tab";

import * as Style from "./profile.style";

const Profile = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Style.Profile>
        <ProfileAvatar onClick={() => setOpen(!open)} />
      </Style.Profile>

      <ProfileTab open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export { Profile };
