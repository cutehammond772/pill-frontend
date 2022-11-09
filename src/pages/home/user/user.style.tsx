/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "@mui/joy";

const Container = styled.div`
  height: 2048px;

  display: flex;
  flex-flow: column;
`;

const PageBehaviorsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
`;

const PageRecentPillsContent = styled.div`
  width: auto;
  height: auto;

  display: flex;
  flex-flow: row nowrap;
  overflow-x: hidden;

  & > div {
    flex-shrink: 0;
    margin: 30px 30px 30px 0;
    width: 300px;
    height: 400px;
    box-shadow: 0px 10px 15px var(--shadow);
  }
`;

const PageSubjectText = styled.div`
  color: var(--dark);
  font-size: 3rem;
  font-weight: 700;
  padding-top: 150px;
  padding-bottom: 50px;
`;

// border color를 props로 수정 가능하도록 한다.
const BehaviorButton = styled(Button)`
  width: auto;
  height: 150px;
  border-radius: 20px;

  display: grid;
  grid-template-columns: 150px 1fr;
  grid-template-rows: 2fr 3fr;
  text-transform: none;

  box-shadow: 0px 5px 15px var(--shadow);

  // 첫번째 요소는 아이콘이 들어간다.
  & > svg:nth-of-type(1) {
    grid-row: 1 / 3;
    padding: 1rem;
    color: var(--light);
    font-size: 80px;
    align-self: center;
  }

  // 두번째 요소는 제목이 들어간다.
  & > span:nth-of-type(1) {
    font-weight: 700;
    color: var(--light);
    font-size: 1.75rem;
    align-self: center;
    text-align: start;
  }

  // 세번째 요소는 내용이 들어간다.
  & > span:nth-of-type(2) {
    color: var(--light);
    font-size: 1.25rem;
    text-align: start;
    align-self: center;
  }
`;

const Background = css`
  background: linear-gradient(
    -45deg,
    hsla(339, 100%, 55%, 0.2) 0%,
    hsla(197, 100%, 64%, 0.2) 100%
  );
`;

export {
  Container,
  BehaviorButton,
  PageSubjectText,
  PageBehaviorsContent,
  PageRecentPillsContent,
  Background,
};
