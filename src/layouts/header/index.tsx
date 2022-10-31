import { Logo } from "../../components/logo";
import Profile from "../../components/profile";
import { HeaderContent } from "./header.style";

import { TextField } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({
  title,
  noSearchBar = false,
}: {
  title?: string;
  noSearchBar?: boolean;
}) => {
  return (
    <HeaderContent>
      {!!title ? (
        // Header Title이 존재하면 title 표시
        <h1>{title}</h1>
      ) : (
        // Header Title이 존재하지 않으면 Logo 표시
        <Logo />
      )}

      {!noSearchBar && (
        <TextField
          placeholder="Search anything"
          variant="outlined"
          startDecorator={<SearchIcon />}
          sx={{
            height: "30px",
          }}
        />
      )}

      <Profile />
    </HeaderContent>
  );
};

export { Header };
