import styled from "@emotion/styled";
import { Button } from "@mui/material";

const UserHomeContent = styled.div`
  height: 2048px;
`;

const PageBehaviorsContent = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 10px;
`;

const PageSubjectText = styled.div`
  font-family: Inter;
  color: white;
  font-size: 3rem;
  font-weight: 700;
  user-select: none;
  padding-top: 60px;
  padding-bottom: 20px;
`;

// border color를 props로 수정 가능하도록 한다.
const BehaviorButton = styled(Button)<{ bordercolor: string }>`
  width: auto;
  height: 150px;
  border-radius: 20px;
  border: 2px solid ${(props) => props.bordercolor};
  flex-grow: "1";

  display: grid;
  grid-template-columns: 150px 1fr;
  grid-template-rows: 2fr 3fr;
  text-transform: none;

  // 첫번째 요소는 아이콘이 들어간다.
  & > svg:nth-of-type(1) {
    grid-row: 1 / 3;
    padding: 1rem;
    color: white;
    font-size: 80px;
    align-self: center;
  }

  // 두번째 요소는 제목이 들어간다.
  & > span:nth-of-type(1) {
    font-family: Inter;
    font-weight: 700;
    color: white;
    font-size: 1.75rem;
    align-self: center;
    user-select: none;
    text-align: start;
  }

  // 세번째 요소는 내용이 들어간다.
  & > span:nth-of-type(2) {
    font-family: Inter;
    color: white;
    font-size: 1.25rem;
    user-select: none;
    text-align: start;
    align-self: flex-start;
  }
`;

export { UserHomeContent, BehaviorButton, PageSubjectText, PageBehaviorsContent };
