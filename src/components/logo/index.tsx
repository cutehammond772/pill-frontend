import { useNavigate } from "react-router-dom";
import * as Style from "./logo.style";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface LogoProps {
  onClick?: () => void;
}

const Logo = (props: LogoProps) => {
  const navigate = useNavigate();

  return (
    <Style.Logo onClick={props.onClick || (() => navigate("/"))}>
      <div className="title_container">
        <div className="title">cutehammond</div>
        <span className="icon"><KeyboardArrowDownIcon /></span>
      </div>
    </Style.Logo>
  );
};

export { Logo };
