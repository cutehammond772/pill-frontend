import * as React from "react";
import * as config from "../../../config";
import { useLayoutEffect, useRef } from "react";

import { Divider } from "./tab.divider";
import * as Style from "./tab.style";

import { ReceivedComments } from "./received_comments/";

import { useProfile } from "../../../utils/hooks/profile";

import { ManageProfileButton, MyPillButton } from "./tab.menu";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthButtonProps, Login, Logout } from "../../auth";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/reducers";
import { Modal } from "../../modal";
import { useLocalization } from "../../../utils/hooks/localization";
import { L10N } from "../../../localization";

const LOGIN_PROPS: AuthButtonProps = {
  redirect: config.INDEX,
  provider: "google",
  size: "md",
};

const LOGOUT_PROPS: AuthButtonProps = {
  redirect: config.INDEX,
  size: "md",
};

const Dummy = {
  comments: [
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
  ],

  stats: {
    timeUnit: "24h",
    commentsCount: 102,
  },
};

interface ProfileTabProps {
  checked: boolean;
  onClose: () => void;
}

const ProfileTab = (props: ProfileTabProps) => {
  const { text } = useLocalization();

  // Code
  const profile = useProfile();
  const modalRef = useRef<HTMLDivElement>(null);
  const headerHeight = useSelector(
    (state: RootState) => state.page.headerHeight
  );

  useLayoutEffect(() => {
    if (!!modalRef?.current) {
      modalRef.current.style.top = `${headerHeight - 20}px`;
    }
  }, [modalRef, headerHeight]);

  return (
    <Modal
      onClose={props.onClose}
      open={props.checked}
      layout={Style.Layout}
      ref={modalRef}
      dialogMode
    >
      {!profile.data.userName ? (
        <>
          <Style.Title>{text(L10N.TAB_01)}</Style.Title>
          <Style.GuestBanner>
            <ThumbUpIcon className="icon"/>
            <span className="content">
            {text(L10N.TAB_02)}
            </span>
          </Style.GuestBanner>

          <Divider title={text(L10N.TAB_03)} />
          <Style.Menu>
            <Login {...LOGIN_PROPS} />
          </Style.Menu>
        </>
      ) : (
        <>
          <Style.Title>{profile.data.userName}</Style.Title>

          <Divider title={text(L10N.TAB_04)} />
          <ReceivedComments
            receivedComments={Dummy.comments}
            stats={Dummy.stats}
          />

          <Divider title={text(L10N.TAB_03)} />
          <Style.Menu>
            <MyPillButton onClick={() => {}} />
            <ManageProfileButton onClick={() => {}} />
            <Logout {...LOGOUT_PROPS} />
          </Style.Menu>
        </>
      )}
    </Modal>
  );
};

export { ProfileTab };
