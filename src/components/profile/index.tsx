import ProfileAvatar from "./profile.avatar";

import * as Style from "./profile.style";
import { useModal } from "../../utils/hooks/modal";
import { ModalTypes } from "../../layouts/modal/modal.type";

const Profile = () => {
  const create = useModal(ModalTypes.PROFILE_TAB, {});

  return (
    <Style.Profile>
      <ProfileAvatar onClick={create} />
    </Style.Profile>
  );
};

export { Profile };
