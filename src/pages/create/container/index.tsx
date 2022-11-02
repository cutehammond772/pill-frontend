import { Chip } from "@mui/joy";

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

import { CreatingPillContainerContent, CreatingPillContainerTitle } from "./create.container.style";
import { CreatingPillContainerProps } from "./create.container.type";

const CreatingPillContainer = ({
  title,
  complete,
  layout,
  children,
}: React.PropsWithChildren<CreatingPillContainerProps>) => {
  return (
    <CreatingPillContainerContent layout={layout}>
      <CreatingPillContainerTitle>
        <span>{title}</span>

        {complete ? (
          <Chip variant="solid" color="success" startDecorator={<CheckIcon />}>
            Complete
          </Chip>
        ) : (
          <Chip variant="solid" color="danger" startDecorator={<CloseIcon />}>
            Not complete
          </Chip>
        )}
      </CreatingPillContainerTitle>
      {children}
    </CreatingPillContainerContent>
  );
};

export { CreatingPillContainer };
