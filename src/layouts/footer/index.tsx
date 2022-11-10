import { Link } from "react-router-dom";
import * as Style from "./footer.style";

const Footer = () => {

  return (
    <Style.Footer>
      <span>&copy; 2022 Jungheon Lee</span>
      <Link
        to="/help"
        style={{
          textDecoration: "none",
        }}
      >
        <span>Help</span>
      </Link>
    </Style.Footer>
  );
};

export { Footer };
