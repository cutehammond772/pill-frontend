import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/serialize";

const ContentContainerStyle = styled.div<{ layout: SerializedStyles }>`
  width: auto;
  height: auto;
  padding: 10px;
  border-radius: 12px;

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
    font-weight: 600;
    font-size: 20px;

    user-select: none;
  }

  // Buttons
  & > div:nth-last-of-type(1) {
    display: flex;
    flex-flow: row;
    align-items: center;
    column-gap: 10px;
  }

  ${(props) => props.layout};
`;

export { ContentContainerStyle, ContentContainerTitleStyle };