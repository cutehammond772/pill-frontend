import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/serialize";

const ContentContainerStyle = styled.div<{ layout: SerializedStyles }>`
  width: auto;
  height: auto;
  border-radius: 5px;
  padding: 10px;

  background: white;
  column-gap: 10px;
  row-gap: 10px;

  ${(props) => props.layout};
`;

const ContentContainerTitleStyle = styled.div<{ layout?: SerializedStyles }>`
  display: flex;
  flex-flow: row;
  column-gap: 10px;
  align-items: center;
  justify-content: space-between;

  // Title
  & > div:nth-of-type(1) {
    display: flex;
    flex-flow: row;
    column-gap: 10px;
    align-items: center;
  }

  & > div:nth-of-type(1) > svg {
    font-size: 30px;
  }

  & > div:nth-of-type(1) > span {
    font-family: Inter;
    font-weight: 600;
    font-size: 20px;
    user-select: none;
  }

  // Buttons
  & > div:nth-of-type(2) {
    display: flex;
    flex-flow: row;
    column-gap: 10px;
    align-items: center;
  }

  ${(props) => props.layout};
`;

export { ContentContainerStyle, ContentContainerTitleStyle };