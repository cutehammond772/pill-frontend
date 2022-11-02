import { Chip } from "@mui/joy";

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

import { ContainerStyle, ContainerTitleStyle } from "./container.style";
import { CreatingPillContainerProps } from "./container.type";

const Container = ({
  title,
  complete,
  layout,
  children,
}: React.PropsWithChildren<CreatingPillContainerProps>) => {
  return (
    <ContainerStyle layout={layout}>
      <ContainerTitleStyle>
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
      </ContainerTitleStyle>
      {children}
    </ContainerStyle>
  );
};

export { Container };
