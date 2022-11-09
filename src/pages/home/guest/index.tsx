import { Login } from "../../../components/auth";

import * as config from "../../../config";
import * as Style from "./guest.style";

const GuestHome = () => {
  return (
    <Style.Container>
      <Style.Text>
        You can take Pill with no side effects, <br />
        and get a useful knowledge.
      </Style.Text>

      <Login redirect={config.INDEX} provider="google">
        Click to Sign in
      </Login>
    </Style.Container>
  );
};

export { GuestHome };
