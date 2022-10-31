import { Grow } from "@mui/material";
import { PropsWithChildren } from "react";

import * as React from "react";
import * as config from "../../../config";

import { Button, Link } from "@mui/joy";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import PropaneIcon from "@mui/icons-material/Propane";
import { ProfileTabTitle } from "./profile.tab.title";
import { ProfileTabDivider } from "./profile.tab.divider";
import { ProfileTabContent, ProfileTabMenu } from "./profile.tab.style";
import { ReceivedCommentData, ReceivedComments, ReceivedCommentsStats } from "./received_comments/";
import { useProfile } from "../../../utils/hooks/profile";

const ProfileTab = ({
  children,
  checked,
}: PropsWithChildren<{ checked: boolean }>) => {

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
    commentsCount: 102
  };

  const profile = useProfile();
  const title = !!profile.data.profile && !!profile.data.profile.userName ? profile.data.profile.userName : "Welcome, Guest!";

  return (
    <Grow
      in={checked}
      style={{
        transformOrigin: "250px 50px",
      }}
    >
      <ProfileTabContent>
        <ProfileTabTitle title={title} />

        <ProfileTabDivider title="Received Comment" />
        <ReceivedComments receivedComments={comments} stats={stats}/>

        <ProfileTabDivider title="Menu" />
        <ProfileTabMenu>
          <Button
            size="md"
            variant="solid"
            color="primary"
            startDecorator={<PropaneIcon />}
          >
            My Pill
          </Button>

          <Button
            size="md"
            variant="solid"
            color="info"
            startDecorator={<ManageAccountsIcon />}
          >
            Manage Profile
          </Button>

          <Button
            size="md"
            variant="solid"
            color="neutral"
            startDecorator={<LogoutIcon />}
          >
            <Link
              href={
                `http://${config.BACKEND_DOMAIN}:${config.BACKEND_PORT}/` +
                `${config.API_LOGOUT_REQUEST}`
              }
              underline="none"
              textColor="white"
              fontFamily="Inter"
            >
              Logout
            </Link>
          </Button>
        </ProfileTabMenu>
      </ProfileTabContent>
    </Grow>
  );
};

export { ProfileTab };
