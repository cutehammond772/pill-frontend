import { Link } from "react-router-dom";
import { DefaultText } from "../../styles/GlobalStyles";
import { FooterContent } from "./footer.style";

const Footer = () => {
  return (
    <FooterContent>
      <DefaultText>&copy; 2022 Jungheon Lee</DefaultText>
      <Link
        to="/"
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
