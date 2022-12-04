import * as React from "react";
import * as Style from "./banner.style";

import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import LoginIcon from "@mui/icons-material/Login";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { UserMenu } from "../menu";
import { I18N, I18nProps } from "../../../../utils/i18n";
import { format } from "../../../../utils/other/format";
import { Notification } from "../notification";

interface UserBannerProps {
  userName: string;
}

interface NotificationBannerProps {
  count: number;
}

interface SubjectProps {
  subject?: string;
}

export const Banner = React.memo(
  (props: SubjectProps & React.PropsWithChildren) => (
    <Style.Banner>
      {!!props.subject && <Style.Subject>{props.subject}</Style.Subject>}
      {props.children}
    </Style.Banner>
  )
);

export const UserBanner = React.memo(
  (props: UserBannerProps & SubjectProps & I18nProps) => (
    <Banner subject={props.subject}>
      <Style.UserBanner>
        <div className="user">{props.userName || props.text(I18N.TAB_02)}</div>
        <UserMenu text={props.text} />
      </Style.UserBanner>
    </Banner>
  )
);

export const GuestBanner = React.memo((props: SubjectProps & I18nProps) => (
  <Banner subject={props.subject}>
    <Style.GuestBanner>
      <div className="icons">
        <LoginIcon />
        <TagFacesIcon />
        <EditIcon />
        <ArticleIcon />
      </div>
      <span className="content">{props.text(I18N.TAB_01)}</span>
    </Style.GuestBanner>
  </Banner>
));

export const EmptyNotificationBanner = React.memo(
  (props: SubjectProps & I18nProps) => (
    <Banner subject={props.subject}>
      <Style.EmptyNotificationBanner>
        <AcUnitIcon className="icon" />
        <div className="content">{props.text(I18N.TAB_03)}</div>
      </Style.EmptyNotificationBanner>
    </Banner>
  )
);

export const NotificationBanner = React.memo(
  (props: NotificationBannerProps & I18nProps) => (
    <Banner subject={format(props.text(I18N.TAB_07), `${props.count}`)}>
      <Notification
        icon={<AcUnitIcon />}
        title="테스트 알림: Cutehammond"
        content="응애 내이름은 이정헌"
        onClick={() => alert("응애")}
        onRemove={() => alert("응애2")}
      />
      <Notification
        icon={<AcUnitIcon />}
        title="테스트 알림: Cutehammond"
        content="응애 내이름은 이정헌"
        onClick={() => alert("응애")}
        onRemove={() => alert("응애2")}
      />
      <Notification
        icon={<AcUnitIcon />}
        title="테스트 알림: Cutehammond"
        content="응애 내이름은 이정헌"
        onClick={() => alert("응애")}
        onRemove={() => alert("응애2")}
      />
      <Notification
        icon={<AcUnitIcon />}
        title="테스트 알림: Cutehammond"
        content="응애 내이름은 이정헌"
        onClick={() => alert("응애")}
        onRemove={() => alert("응애2")}
      />
      <Notification
        icon={<AcUnitIcon />}
        title="테스트 알림: Cutehammond"
        content="응애 내이름은 이정헌"
        onClick={() => alert("응애")}
        onRemove={() => alert("응애2")}
      />
      <Notification
        icon={<AcUnitIcon />}
        title="테스트 알림: Cutehammond"
        content="응애 내이름은 이정헌"
        onClick={() => alert("응애")}
        onRemove={() => alert("응애2")}
      />
    </Banner>
  )
);
