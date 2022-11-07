import { Grow } from "@mui/material";

import * as React from "react";
import * as config from "../../../config";

import { Divider } from "./tab.divider";
import {
  GuestBannerStyle,
  ContainerStyle,
  MenuStyle,
  TitleStyle,
} from "./tab.style";

import {
  ReceivedCommentData,
  ReceivedComments,
  ReceivedCommentsStats,
} from "./received_comments/";

import { useProfile } from "../../../utils/hooks/profile";

import {
  LoginButton,
  LogoutButton,
  ManageProfileButton,
  MyPillButton,
} from "./tab.menu";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthRequest } from "../../auth/auth.type";

const GuestProfileTab = React.forwardRef<HTMLDivElement>((props, ref) => {
  const request: AuthRequest = {
    redirect: config.INDEX,
    provider: "google",
  };

  return (
    <ContainerStyle ref={ref} {...props}>
      <TitleStyle>Welcome, Guest!</TitleStyle>

      <GuestBannerStyle>
        <ThumbUpIcon />
        <span>
          Join with just one click without complicated registration and enjoy
          useful information!
        </span>
      </GuestBannerStyle>

      <Divider title="Menu" />
      <MenuStyle>
        <LoginButton request={request} />
      </MenuStyle>
    </ContainerStyle>
  );
});

interface ProfileTabProps {
  checked: boolean;
}

const ProfileTab = (props: ProfileTabProps) => {
  // Dummy

  const comments: Array<ReceivedCommentData> = [
    {
      title: "Brunch this weekend?",
      userName: "cutehammond",
      comment:
        "I'll be in your neighborhood doing errands this Tuesday. I'll be in your...",
      key: 0,
    },
    {
      title: "Summer BBQ",
      userName: "udonehn",
      comment: "Wish I could come, but I'm out of town.",
      key: 1,
    },
  ];

  const stats: ReceivedCommentsStats = {
    timeUnit: "24h",
    commentsCount: 102,
  };

  // Code
  const profile = useProfile();

  return (
    <Grow
      in={props.checked}
      style={{
        transformOrigin: "250px 50px",
      }}
    >
      {!(!!profile.data.profile && !!profile.data.profile.userName) ? (
        <GuestProfileTab />
      ) : (
        <ContainerStyle>
          <TitleStyle>{profile.data.profile.userName}</TitleStyle>

          <Divider title="Received Comment" />
          <ReceivedComments receivedComments={comments} stats={stats} />

          <Divider title="Menu" />
          <MenuStyle>
            <MyPillButton onClick={() => {}} />
            <ManageProfileButton onClick={() => {}} />
            <LogoutButton />
          </MenuStyle>
        </ContainerStyle>
      )}
    </Grow>
  );
};

export { ProfileTab };
