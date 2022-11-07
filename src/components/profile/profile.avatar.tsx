import * as React from "react";
import { Avatar } from "@mui/joy";
import { Tooltip } from "@mui/material";

import { useProfile } from "../../utils/hooks/profile";
import { DefaultProfile, ProfileData } from "./profile.type";

interface AvatarProps {
  profile?: ProfileData;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

interface ProfileAvatarProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const ProfileAvatar = (props: ProfileAvatarProps) => {
  const profile = useProfile();
  const state = profile.data;

  let data: ProfileData;

  if (!state.inited) {
    data = DefaultProfile.LOADING;
  } else if (!state.profile) {
    data = DefaultProfile.GUEST;
  } else {
    data = state.profile;
  }

  return (
    <Tooltip
      title={!data.userName ? "Guest" : data.userName}
      disableInteractive
    >
      {!state.profile ? (
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
      <Avatar color="primary" variant="solid" size="md" sx={{ zIndex: 6 }} />
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
        sx={{ zIndex: 6 }}
      />
    </div>
  ) : (
    <DefaultAvatar onClick={props.onClick} />
  )
);

export { ProfileAvatar };
