import { Chip } from "@mui/joy";

import { InfoStyle } from "./profile.style";

import CopyrightIcon from "@mui/icons-material/Copyright";

interface ProfilePointInfoProps {
  point: number;
}

const ProfilePointInfo = (props: ProfilePointInfoProps) => {
  return (
    <InfoStyle>
      <Chip
        variant="solid"
        color="success"
        size="md"
        startDecorator={<CopyrightIcon />}
      >
        {props.point}
      </Chip>
    </InfoStyle>
  );
};

export { ProfilePointInfo };
