import { Link } from "react-router-dom";
import { DefaultText } from "../../GlobalStyles";
import { FooterContent } from "./footer.style";

const Footer = () => {
  return (
    <FooterContent>
      <DefaultText>&copy; 2022 Jungheon Lee</DefaultText>
      <Link
        to="/help"
        style={{
          textDecoration: "none",
        }}
      >
        <DefaultText>Help</DefaultText>
      </Link>
    </FooterContent>
  );
};

export { Footer };
