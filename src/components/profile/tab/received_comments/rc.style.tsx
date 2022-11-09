import styled from "@emotion/styled";
import { List, ListItem } from "@mui/joy";

const Container = styled(List)`
  min-width: 240;
  border-radius: sm;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 1rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  align-items: center;
`;

const Content = styled.div`
  color: grey;
  font-size: 0.8rem;

  // Username Chip
  & > div:nth-of-type(1) {
    position: relative;
    left: -5px;
    font-size: 0.7rem;
  }
`;

const History = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: center;
  color: gray;

  // text
  & > span {
    color: gray;
    font-size: 0.8rem;
  }
`;

const Footer = styled(ListItem)`
  display: flex;
  justify-content: space-between;
`;

export {
  Container,
  Content,
  Header,
  Title,
  Buttons,
  History,
  Footer,
};
