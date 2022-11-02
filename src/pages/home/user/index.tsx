import * as React from "react";
import {
  BehaviorButton,
  UserHomeContent,
  PageSubjectText,
  PageBehaviorsContent
} from "./user.home.style";

import AddIcon from "@mui/icons-material/Add";
import ExploreIcon from "@mui/icons-material/Explore";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();

  return (
    <UserHomeContent>

      <PageSubjectText>Behaviors</PageSubjectText>
      <PageBehaviorsContent>
        <BehaviorButton color="info" variant="outlined" bordercolor="violet" onClick={() => {navigate("/create")}}>
          <AddIcon />
          <span>Create Pill</span>
          <span>'Pill' with useful information that only you have.</span>
        </BehaviorButton>

        <BehaviorButton color="success" variant="outlined" bordercolor="green">
          <ExploreIcon />
          <span>Explore Pills</span>
          <span>Explore various Pills made by good users.</span>
        </BehaviorButton>
      </PageBehaviorsContent>

      <PageSubjectText>Recent Pills</PageSubjectText>
      <PageSubjectText>Most Liked</PageSubjectText>
    </UserHomeContent>
  );
};

export { UserHome };
