import { Chip } from "@mui/joy";
import { SerializedStyles } from "@emotion/react";

import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckIcon from "@mui/icons-material/Check";

import * as Style from "./container.style";
import { useLocalization } from "../../../utils/hooks/l10n";
import { L10N } from "../../../localization";

interface CreatingPillContainerProps {
  title: string;
  complete: boolean;
  layout: SerializedStyles;
}

const Container = (
  props: React.PropsWithChildren<CreatingPillContainerProps>
) => {
  const { text } = useLocalization();

  return (
    <div>
      <Style.Title>
        {props.complete ? (
          <Chip variant="solid" color="success" startDecorator={<CheckIcon />}>
            {text(L10N.PAGE_CREATE_32)}
          </Chip>
        ) : (
          <Chip
            variant="solid"
            color="warning"
            startDecorator={<PriorityHighIcon />}
          >
            {text(L10N.PAGE_CREATE_31)}
          </Chip>
        )}

        <span className="title">{props.title}</span>
      </Style.Title>
      <Style.Container layout={props.layout}>{props.children}</Style.Container>
    </div>
  );
};

export default Container;
