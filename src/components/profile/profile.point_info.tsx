import { Chip } from "@mui/joy";

import { InfoStyle } from "./profile.style";

import CopyrightIcon from "@mui/icons-material/Copyright";

const ProfilePointInfo = ({ point }: { point: number }) => {
  return (
    <InfoStyle>
      <Chip
        variant="solid"
        color="success"
        size="md"
        startDecorator={<CopyrightIcon />}
      >
        {point}
      </Chip>
    </InfoStyle>
  );
};

export { ProfilePointInfo };
