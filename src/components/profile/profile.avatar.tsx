import * as React from "react";
import { Avatar } from "@mui/joy";
import { Tooltip } from "@mui/material";

import { useI18n } from "../../utils/hooks/i18n";
import { I18N } from "../../utils/i18n";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/reducers";

export interface ProfileData {
  userName?: string;
  profileUrl?: string;
}

interface AvatarProps {
  profile?: ProfileData;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

interface ProfileAvatarProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const ProfileAvatar = (props: ProfileAvatarProps) => {
  const { text } = useI18n();
  const profile = useSelector((state: RootState) => state.profile);

  return (
    <Tooltip title={profile.userName || text(I18N.PROFILE_01)} disableInteractive>
      {!profile.userName ? (
        <DefaultAvatar onClick={props.onClick} />
      ) : (
        <UserAvatar profile={profile} onClick={props.onClick} />
      )}
    </Tooltip>
  );
};

// 기본 아바타 (Guest, Loading)
const DefaultAvatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => (
    <div ref={ref} {...props}>
      <Avatar color="primary" variant="solid" size="md" />
    </div>
  )
);

// 유저 아바타
const UserAvatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) =>
  !!props.profile ? (
    <div ref={ref} {...props}>
      <Avatar
        alt={props.profile.userName}
        src={props.profile.profileUrl}
        size="md"
      />
    </div>
  ) : (
    <DefaultAvatar onClick={props.onClick} />
  )
);

export default ProfileAvatar;
