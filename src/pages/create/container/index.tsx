import { Chip } from "@mui/joy";
import { SerializedStyles } from "@emotion/serialize";

import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckIcon from "@mui/icons-material/Check";

import * as Style from "./container.style";

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
      <Style.Title>
        {props.complete ? (
          <Chip variant="solid" color="success" startDecorator={<CheckIcon />}>
            저장 가능합니다!
          </Chip>
        ) : (
          <Chip variant="solid" color="warning" startDecorator={<PriorityHighIcon />}>
            모든 부분을 채워주세요.
          </Chip>
        )}

        <span className="title">{props.title}</span>
      </Style.Title>
      <Style.Container layout={props.layout}>{props.children}</Style.Container>
    </div>
  );
};

export { Container };
