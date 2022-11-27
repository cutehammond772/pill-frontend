import * as React from "react";
import * as Style from "./user.style";

import AddIcon from "@mui/icons-material/Add";
import ExploreIcon from "@mui/icons-material/Explore";
import { useNavigate } from "react-router-dom";
import { useLocalization } from "../../../utils/hooks/l10n";
import { L10N } from "../../../localization";

const UserHome = React.memo(() => {
  const navigate = useNavigate();
  const { text } = useLocalization();

  return (
    <Style.Container>
      <Style.PageSubjectText>
        {text(L10N.PAGE_USER_01)}
      </Style.PageSubjectText>
      <Style.PageBehaviorsContent>
        <Style.BehaviorButton
          color="info"
          variant="solid"
          onClick={() => {
            navigate("/create");
          }}
        >
          <AddIcon className="icon" />
          <span className="title">{text(L10N.PAGE_USER_04)}</span>
          <span className="content">
            {text(L10N.PAGE_USER_05)}
          </span>
        </Style.BehaviorButton>

        <Style.BehaviorButton color="success" variant="solid">
          <ExploreIcon className="icon" />
          <span className="title">
            {text(L10N.PAGE_USER_06)}
          </span>
          <span className="content">
            {text(L10N.PAGE_USER_07)}
          </span>
        </Style.BehaviorButton>
      </Style.PageBehaviorsContent>

      <Style.PageSubjectText>
        {text(L10N.PAGE_USER_02)}
      </Style.PageSubjectText>
      <Style.PageRecentPillsContent></Style.PageRecentPillsContent>

      <Style.PageSubjectText>
        {text(L10N.PAGE_USER_03)}
      </Style.PageSubjectText>
    </Style.Container>
  );
});

export { UserHome };
