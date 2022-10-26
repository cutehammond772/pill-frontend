import { Logo } from "../../components/logo";
import Profile from "../../components/profile/Profile";
import { HeaderContent } from "./header.style";

const Header = ({ title }: { title?: string }) => {
  return (
    <HeaderContent>
      {!!title ? (
        // Header Title이 존재하면 title 표시
        <h1>{title}</h1>
      ) : (
        // Header Title이 존재하지 않으면 Logo 표시
        <Logo />
      )}
      <Profile />
    </HeaderContent>
  );
};

export { Header };
