import { Button } from "@mui/joy";

import PropaneIcon from "@mui/icons-material/Propane";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const MyPillButton = ({ onClick }: { onClick: () => void }) => {
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
};

const ManageProfileButton = ({ onClick }: { onClick: () => void }) => {
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
};

export { MyPillButton, ManageProfileButton };
