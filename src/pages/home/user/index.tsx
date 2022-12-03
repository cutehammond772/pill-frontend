import * as React from "react";
import * as Style from "./user.style";

import AddIcon from "@mui/icons-material/Add";
import ExploreIcon from "@mui/icons-material/Explore";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../../utils/hooks/i18n";
import { I18N } from "../../../utils/i18n";

const UserHome = () => {
  const navigate = useNavigate();
  const { text } = useI18n();

  return (
    <Style.Container>
      <Style.Subject>{text(I18N.PAGE_USER_01)}</Style.Subject>
      <Style.Behaviors>
        <div
          className="button"
          onClick={() => {
            navigate("/create");
          }}
        >
          <AddIcon className="icon" />
          <span className="title">{text(I18N.PAGE_USER_04)}</span>
          <span className="content">{text(I18N.PAGE_USER_05)}</span>
        </div>

        <div
          className="button"
          onClick={() => {
            navigate("/explore");
          }}
        >
          <ExploreIcon className="icon" />
          <span className="title">{text(I18N.PAGE_USER_06)}</span>
          <span className="content">{text(I18N.PAGE_USER_07)}</span>
        </div>
      </Style.Behaviors>

      <Style.Subject>{text(I18N.PAGE_USER_02)}</Style.Subject>
      <Style.RecentPills></Style.RecentPills>

      <Style.Subject>{text(I18N.PAGE_USER_03)}</Style.Subject>
    </Style.Container>
  );
};

export default UserHome;
