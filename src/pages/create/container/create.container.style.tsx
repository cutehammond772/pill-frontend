import styled from "@emotion/styled";

import { SerializedStyles } from "@emotion/serialize";

const CreatingPillContainerContent = styled.div<{ layout: SerializedStyles }>`
  width: auto;
  height: auto;

  border-radius: 20px;
  border: 2px solid grey;

  position: relative;
  margin-top: 128px;
  padding: 15px;

  ${(props) => props.layout};
`;

const CreatingPillContainerTitle = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 15px;
  align-items: center;

  position: absolute;
  left: 0;
  top: 0;
  transform: translate(0%, -150%);

  // Title
  & > span:nth-of-type(1) {
    color: white;
    font-family: Inter;
    font-weight: 700;
    font-size: 25px;

    user-select: none;
  }

  // Complete Chip
  & > div:nth-of-type(1) {
    user-select: none;
  }
`;

export { CreatingPillContainerContent, CreatingPillContainerTitle };
