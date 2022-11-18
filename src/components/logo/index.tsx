import { useNavigate } from "react-router-dom";
import { LogoStyle } from "./logo.style";

interface LogoProps {
  onClick?: () => void;
}

const Logo = (props: LogoProps) => {
  const navigate = useNavigate();
  
  return <LogoStyle onClick={props.onClick || (() => navigate("/"))} />;
};

export { Logo };
