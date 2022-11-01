import { Box, Chip, Typography } from "@mui/joy";

import CopyrightIcon from "@mui/icons-material/Copyright";

const ProfileInfo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        columnGap: "30px",
        flexFlow: "row",
        pr: "20px",
        alignItems: "center",
      }}
    >
      <Chip
        variant="solid"
        color="success"
        size="md"
        startDecorator={<CopyrightIcon />}
        sx={{
          userSelect: "none",
        }}
      >
        <Typography sx={{
            fontFamily: "Inter",
            color: "white"
        }}>30000</Typography>
      </Chip>
    </Box>
  );
};

export { ProfileInfo };
