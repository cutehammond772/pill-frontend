import styled from "@emotion/styled";
import { Divider as DividerComponent } from "@mui/joy";

const Container = styled.div`
  width: 300px;
  height: auto;
  padding: 1rem;
  border-radius: 20px;
  
  background: var(--light);
  box-shadow: 0px 0px 30px var(--shadow);

  position: absolute;
  top: 1rem;
  right: 0;

  z-index: var(--z-header-tab);
`;

const Title = styled.span`
  color: var(--dark);
  font-weight: 700;
  font-size: 1.5rem;

  position: relative;
  top: 0.5rem;
`;

const Divider = styled(DividerComponent)`
  padding-top: 20px;
  padding-bottom: 10px;

  letter-spacing: 0.15rem;
  font-size: 0.5rem;
  color: var(--dark);
  font-weight: 700;
  text-transform: uppercase;
`;

const Menu = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 5px;
  row-gap: 5px;
  justify-content: center;
`;

const GuestBanner = styled.div`
  height: 200px;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;
  background: linear-gradient(
    90deg,
    hsla(339, 50%, 55%, 1) 0%,
    hsla(197, 50%, 64%, 1) 100%
  );
  padding: 1rem;
  margin-top: 40px;

  & > svg {
    font-size: 60px;
  }

  & > span {
    color: var(--dark);
    text-align: center;
    font-size: 1rem;
  }
`;

export {
  Container,
  Title,
  Divider,
  Menu,
  GuestBanner
};
