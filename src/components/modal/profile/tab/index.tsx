import * as React from "react";
import * as Style from "./tab.style";

import { useRef, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useI18n } from "../../../../utils/hooks/i18n";
import { DefaultModal } from "../../../../layouts/modal/default";
import { GuestBanner, NotificationBanner, UserBanner } from "./banner";

import { GuestMenu } from "./menu";
import { I18N } from "../../../../utils/i18n";
import { CustomModalProps } from "../../../../layouts/modal/modal.type";
import { StaticSelectors as selectors } from "../../../../utils/reducers/profile";

export const ProfileTabModal = (props: CustomModalProps) => {
  const { text } = useI18n();
  const profile = useSelector(selectors.PROFILE);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (props.open) {
      !!containerRef?.current && containerRef.current.focus();
    }
  }, [props.open]);

  return (
    <DefaultModal
      open={props.open}
      onClose={props.onClose}
      modalID={props.modalID}
    >
      <Style.Container ref={containerRef}>
        {!profile.userName ? (
          <>
            <GuestBanner text={text} />
            <GuestMenu text={text} />
          </>
        ) : (
          <>
            <UserBanner
              userName={profile.userName || text(I18N.TAB_02)}
              text={text}
            />
            {/* <EmptyNotificationBanner text={text} /> */}
            <NotificationBanner text={text} count={5} />
          </>
        )}
      </Style.Container>
    </DefaultModal>
  );
};
