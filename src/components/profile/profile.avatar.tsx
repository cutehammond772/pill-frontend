import * as React from "react";
import { Avatar } from "@mui/joy";
import { Tooltip } from "@mui/material";

import { useProfile } from "../../utils/hooks/profile";
import { useLocalization } from "../../utils/hooks/localization";
import { L10N } from "../../localization";

interface ProfileData {
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
  const { text } = useLocalization();
  const profile = useProfile();
  const data = profile.data;

  return (
    <Tooltip title={data.userName || text(L10N.PROFILE_01)} disableInteractive>
      {!data.userName ? (
        <DefaultAvatar onClick={props.onClick} />
      ) : (
        <UserAvatar profile={data} onClick={props.onClick} />
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

export { ProfileAvatar, type ProfileData };
