import { Login } from "../../../components/auth";

import * as config from "../../../config"
import { GuestHomeContent, GuestHomeContentText } from "./guest.home.style";

const GuestHome = () => {
  return (
    <GuestHomeContent>
      <GuestHomeContentText>
        You can take Pill with no side effects, <br />
        and get a useful knowledge.
      </GuestHomeContentText>

      <Login redirect={config.INDEX} provider="google">
        Click to Sign in
      </Login>
    </GuestHomeContent>
  );
};

export { GuestHome };
