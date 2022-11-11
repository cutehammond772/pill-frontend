import * as React from "react";
import * as Style from "./user.style";

import AddIcon from "@mui/icons-material/Add";
import ExploreIcon from "@mui/icons-material/Explore";
import { useNavigate } from "react-router-dom";
import { PillPreview } from "../../../components/preview";

const UserHome = React.memo(() => {
  const navigate = useNavigate();

  return (
    <Style.Container>
      <Style.PageSubjectText>Behaviors</Style.PageSubjectText>
      <Style.PageBehaviorsContent>
        <Style.BehaviorButton
          color="info"
          variant="solid"
          onClick={() => {
            navigate("/create");
          }}
        >
          <AddIcon />
          <span>Create a Pill</span>
          <span>'Pill' with useful information that only you have.</span>
        </Style.BehaviorButton>

        <Style.BehaviorButton color="success" variant="solid">
          <ExploreIcon />
          <span>Explore Pills</span>
          <span>Explore various Pills made by good users.</span>
        </Style.BehaviorButton>
      </Style.PageBehaviorsContent>

      <Style.PageSubjectText>Recent Pills</Style.PageSubjectText>
      <Style.PageRecentPillsContent>
        <PillPreview
          title="Test01"
          author="udonehn"
          likes={99}
          time="1 hours"
        />
        <PillPreview
          title="Test02"
          author="cutehammond"
          likes={43}
          time="1 hours"
        />
        <PillPreview
          title="Test03"
          author="pcmaster0228"
          likes={22}
          time="1 hours"
        />
        <PillPreview title="Test04" author="hekate" likes={9} time="1 hours" />
      </Style.PageRecentPillsContent>

      <Style.PageSubjectText>Most Liked</Style.PageSubjectText>
    </Style.Container>
  );
});

export { UserHome };
