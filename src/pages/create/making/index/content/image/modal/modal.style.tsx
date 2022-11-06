import styled from "@emotion/styled";

import { IconButton, Modal, ModalDialog } from "@mui/joy";
import { Visible, Invisible, Blur, NoBlur } from "./modal.type";
import { TransitionStatus } from "react-transition-group/Transition";

const backDropStyle = (state: TransitionStatus) =>
  ({
    entering: [Visible, Blur],
    entered: [Visible, Blur],
    exited: [Invisible, NoBlur],
    exiting: [Invisible, NoBlur],
    unmounted: [Invisible, NoBlur],
  }[state]);

const dialogOpacity = (state: TransitionStatus) =>
  ({
    entering: Visible,
    entered: Visible,
    exited: Invisible,
    exiting: Invisible,
    unmounted: Invisible,
  }[state]);

const ModalStyle = styled(Modal)<{ state: TransitionStatus }>`
  & .MuiBackdrop-root {
    transition: opacity 200ms, backdrop-filter 200ms;
    ${(props) => backDropStyle(props.state)};
  }

  visibility: ${(props) => (props.state === "exited" ? "hidden" : "visible")};
`;

const ModalDialogStyle = styled(ModalDialog)<{ state: TransitionStatus }>`
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 0px 10px black;
  transition: opacity 200ms;

  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  align-items: center;

  ${(props) => dialogOpacity(props.state)};
`;

const ImagePreview = styled.div`
  display: flex;
  justify-content: center;

  // Image
  & > img {
    min-width: 300px;
    min-height: 300px;
    max-width: 600px;
    max-height: 600px;

    background: #202020;
    border-radius: 5px;
    object-fit: scale-down;
  }

  // Background
  & > div {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;

    min-width: 300px;
    min-height: 300px;
    max-width: 400px;
    max-height: 400px;

    background: #202020;
    border-radius: 5px;
  }

  // Background Icon
  & > div > svg {
    font-size: 40px;
  }

  // Background Message
  & > div > span {
    font-family: Inter;
    text-align: center;

    align-self: center;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const FormStyle = styled.div`
  display: flex;
  flex-flow: column;
  row-gap: 20px;
  min-width: 500px;

  // Title Container
  & > div:nth-of-type(1) {
    display: flex;
    flex-flow: row;
    column-gap: 5px;
  }

  & > div:nth-of-type(1) > svg {
    font-size: 1.5rem;
  }

  & > div:nth-of-type(1) > span {
    font-family: Inter;
    font-weight: 700;
    font-size: 1.5rem;
    user-select: none;
    line-height: 100%;
  }
`;

const ImageInputFormStyle = styled.div`
  display: flex;
  flex-flow: row;
  align-items: flex-end;
  column-gap: 5px;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 15px;
  top: 15px;
`;

export { ModalStyle, ModalDialogStyle, ImagePreview, FormStyle, ImageInputFormStyle, CloseButton };
