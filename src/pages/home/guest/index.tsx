import { Login } from "../../../components/auth";

import * as config from "../../../config";
import { ContentStyle, TextStyle } from "./guest.style";

const GuestHome = () => {
  return (
    <ContentStyle>
      <TextStyle>
        You can take Pill with no side effects, <br />
        and get a useful knowledge.
      </TextStyle>

      <Login redirect={config.INDEX} provider="google">
        Click to Sign in
      </Login>
    </ContentStyle>
  );
};

export { GuestHome };
