import { Chip } from "@mui/joy";
import { SerializedStyles } from "@emotion/react";

import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckIcon from "@mui/icons-material/Check";

import * as Style from "./container.style";
import { useI18n } from "../../../utils/hooks/i18n";
import { I18N } from "../../../utils/i18n";

interface CreatingPillContainerProps {
  title: string;
  complete: boolean;
  layout: SerializedStyles;
}

const Container = (
  props: React.PropsWithChildren<CreatingPillContainerProps>
) => {
  const { text } = useI18n();

  return (
    <div>
      <Style.Title>
        {props.complete ? (
          <Chip variant="solid" color="success" startDecorator={<CheckIcon />}>
            {text(I18N.PAGE_CREATE_32)}
          </Chip>
        ) : (
          <Chip
            variant="solid"
            color="warning"
            startDecorator={<PriorityHighIcon />}
          >
            {text(I18N.PAGE_CREATE_31)}
          </Chip>
        )}

        <span className="title">{props.title}</span>
      </Style.Title>
      <Style.Container layout={props.layout}>{props.children}</Style.Container>
    </div>
  );
};

export default Container;
