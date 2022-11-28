import { Button } from "@mui/joy";
import * as React from "react";

import PropaneIcon from "@mui/icons-material/Propane";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const MyPillButton = React.memo(({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      size="md"
      variant="solid"
      color="primary"
      startDecorator={<PropaneIcon />}
      onClick={onClick}
    >
      My Pill
    </Button>
  );
});

const ManageProfileButton = React.memo(
  ({ onClick }: { onClick: () => void }) => {
    return (
      <Button
        size="md"
        variant="solid"
        color="info"
        startDecorator={<ManageAccountsIcon />}
      >
        Manage Profile
      </Button>
    );
  }
);

export { MyPillButton, ManageProfileButton };
