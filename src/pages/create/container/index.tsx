import { Chip } from "@mui/joy";
import { SerializedStyles } from "@emotion/serialize";

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

import { ContainerStyle, ContainerTitleStyle } from "./container.style";

interface CreatingPillContainerProps {
  title: string;
  complete: boolean;
  layout: SerializedStyles;
}

const Container = (
  props: React.PropsWithChildren<CreatingPillContainerProps>
) => {
  return (
    <div>
      <ContainerTitleStyle>
        <span>{props.title}</span>

        {props.complete ? (
          <Chip variant="solid" color="success" startDecorator={<CheckIcon />}>
            Complete
          </Chip>
        ) : (
          <Chip variant="solid" color="danger" startDecorator={<CloseIcon />}>
            Not complete
          </Chip>
        )}
      </ContainerTitleStyle>
      <ContainerStyle layout={props.layout}>{props.children}</ContainerStyle>
    </div>
  );
};

export { Container };
