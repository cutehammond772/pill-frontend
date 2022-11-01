import { Grow } from "@mui/material";

import * as React from "react";
import * as config from "../../../config";

import { ProfileTabTitle } from "./profile.tab.title";
import { ProfileTabDivider } from "./profile.tab.divider";
import {
  GuestProfileBanner,
  ProfileTabContent,
  ProfileTabMenu,
} from "./profile.tab.style";

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
} from "./profile.tab.menu";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthRequest } from "../../auth/auth.type";

const GuestProfileTabContent = React.forwardRef<HTMLDivElement>(
  (props, ref) => {
    const request: AuthRequest = {
      redirect: config.INDEX,
      provider: "google",
    };

    return (
      <ProfileTabContent ref={ref} {...props}>
        <ProfileTabTitle title="Welcome, Guest!" />

        <GuestProfileBanner>
          <ThumbUpIcon />
          <span>
            Join with just one click without complicated registration and enjoy
            useful information!
          </span>
        </GuestProfileBanner>

        <ProfileTabDivider title="Menu" />
        <ProfileTabMenu>
          <LoginButton request={request} />
        </ProfileTabMenu>
      </ProfileTabContent>
    );
  }
);

const ProfileTab = ({
  checked,
}: React.PropsWithChildren<{ checked: boolean }>) => {
  // Dummy

  const comments: Array<ReceivedCommentData> = [
    {
      title: "Brunch this weekend?",
      userName: "cutehammond",
      comment:
        "I'll be in your neighborhood doing errands this Tuesday. I'll be in your...",
    },
    {
      title: "Summer BBQ",
      userName: "udonehn",
      comment: "Wish I could come, but I'm out of town.",
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
      in={checked}
      style={{
        transformOrigin: "250px 50px",
      }}
    >
      {!(!!profile.data.profile && !!profile.data.profile.userName) ? (
        <GuestProfileTabContent />
      ) : (
        <ProfileTabContent>
          <ProfileTabTitle title={profile.data.profile.userName} />

          <ProfileTabDivider title="Received Comment" />
          <ReceivedComments receivedComments={comments} stats={stats} />

          <ProfileTabDivider title="Menu" />
          <ProfileTabMenu>
            <MyPillButton onClick={() => {}} />
            <ManageProfileButton onClick={() => {}} />
            <LogoutButton />
          </ProfileTabMenu>
        </ProfileTabContent>
      )}
    </Grow>
  );
};

export { ProfileTab };
