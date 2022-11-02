import { Chip } from "@mui/joy";

import { ProfilePointInfoContent } from "./profile.style";

import CopyrightIcon from "@mui/icons-material/Copyright";

const ProfilePointInfo = ({ point }: { point: number }) => {
  return (
    <ProfilePointInfoContent>
      <Chip
        variant="solid"
        color="success"
        size="md"
        startDecorator={<CopyrightIcon />}
      >
        {point}
      </Chip>
    </ProfilePointInfoContent>
  );
};

export { ProfilePointInfo };
