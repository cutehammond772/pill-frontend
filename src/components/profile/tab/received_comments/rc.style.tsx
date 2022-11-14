import styled from "@emotion/styled";
import { List, ListItem } from "@mui/joy";

const Container = styled(List)`
  min-width: 240;
  border-radius: 10px;
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
  color: var(--sub);
  font-size: 0.8rem;

  // User Chip
  & > .user {
    position: relative;
    left: -5px;

    width: auto;
    height: auto;
    padding: 3px 6px 3px 6px;

    display: inline-block;
    font-size: 0.7rem;

    background-color: var(--dark);
    color: var(--light);

    border-radius: 10px;
  }
`;

const History = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: center;

  color: var(--sub);

  // history info
  & > .info {
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
