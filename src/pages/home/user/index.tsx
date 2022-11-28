import * as React from "react";
import * as Style from "./user.style";

import AddIcon from "@mui/icons-material/Add";
import ExploreIcon from "@mui/icons-material/Explore";
import { useNavigate } from "react-router-dom";
import { useLocalization } from "../../../utils/hooks/l10n";
import { L10N } from "../../../localization";

const UserHome = () => {
  const navigate = useNavigate();
  const { text } = useLocalization();

  return (
    <Style.Container>
      <Style.Subject>{text(L10N.PAGE_USER_01)}</Style.Subject>
      <Style.Behaviors>
        <div
          className="button"
          onClick={() => {
            navigate("/create");
          }}
        >
          <AddIcon className="icon" />
          <span className="title">{text(L10N.PAGE_USER_04)}</span>
          <span className="content">{text(L10N.PAGE_USER_05)}</span>
        </div>

        <div className="button">
          <ExploreIcon className="icon" />
          <span className="title">{text(L10N.PAGE_USER_06)}</span>
          <span className="content">{text(L10N.PAGE_USER_07)}</span>
        </div>
      </Style.Behaviors>

      <Style.Subject>{text(L10N.PAGE_USER_02)}</Style.Subject>
      <Style.RecentPills></Style.RecentPills>

      <Style.Subject>{text(L10N.PAGE_USER_03)}</Style.Subject>
    </Style.Container>
  );
};

export default UserHome;
