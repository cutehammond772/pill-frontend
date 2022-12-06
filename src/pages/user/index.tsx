import * as React from "react";

import Page from "../../layouts/page";
import { useParams } from "react-router-dom";

import * as Style from "./user.style";

const UserPage = () => {
  const { userID } = useParams();

  return (
    <Page>
      <Style.Container></Style.Container>
    </Page>
  );
};

export default UserPage;
