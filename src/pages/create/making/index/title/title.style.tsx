import styled from "@emotion/styled";
import { Button } from "@mui/joy";

const Title = styled.div`
  width: auto;
  height: auto;
  padding: 15px 10px 15px 10px;

  background: linear-gradient(
    45deg,
    hsla(339, 100%, 55%, 0.2) 0%,
    hsla(197, 100%, 64%, 0.2) 100%
  );

  display: flex;
  flex-flow: row;
  align-items: center;
  column-gap: 10px;

  border-radius: 20px 20px 0 0;

  // Index Signature
  & > span:nth-of-type(1) {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--dark);
    padding-left: 15px;
    padding-right: 15px;
    line-height: 100%;
  }

  // Remove Icon
  & > svg:nth-of-type(1) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const TitleEditButton = styled(Button)`
  width: auto;
  height: auto;
  border-radius: 8px;

  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;

  display: flex;
  flex-flow: row;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  line-height: 100%;
  align-self: stretch;

  font-weight: 600;
  font-size: 1.2rem;
  color: var(--dark);
`;

export { Title, TitleEditButton };
