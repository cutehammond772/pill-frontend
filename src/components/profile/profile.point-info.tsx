import { Chip } from "@mui/joy";

import * as Style from "./profile.style";
import CopyrightIcon from "@mui/icons-material/Copyright";

interface ProfilePointInfoProps {
  point: number;
}

const ProfilePointInfo = (props: ProfilePointInfoProps) => {
  return (
    <Style.Info>
      <Chip
        variant="solid"
        color="success"
        size="md"
        startDecorator={<CopyrightIcon />}
      >
        {props.point}
      </Chip>
    </Style.Info>
  );
};

export { ProfilePointInfo };
