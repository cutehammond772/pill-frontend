import styled from "@emotion/styled";
import { Divider } from "@mui/joy";

const ContainerStyle = styled.div`
  width: 300px;
  height: auto;
  background: #303030;
  border-radius: 20px;
  position: absolute;
  top: 1rem;
  right: calc(300px + 1rem);

  padding: 1rem;
  z-index: 5;
`;

const TitleStyle = styled.span`
  color: white;
  font-family: Inter;
  font-weight: 500;
  font-size: 1.5rem;
  user-select: none;

  position: relative;
  top: 0.5rem;
`;

const DividerStyle = styled(Divider)`
  padding-top: 20px;
  padding-bottom: 10px;

  letter-spacing: 0.15rem;
  font-size: 0.5rem;
  color: grey;
  font-weight: 700;
  text-transform: uppercase;
  user-select: none;
`;

const MenuStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 5px;
  row-gap: 5px;
  justify-content: center;
`;

const GuestBannerStyle = styled.div`
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
    font-family: Inter;
    color: #202020;
    text-align: center;
    font-size: 1rem;
    user-select: none;
  }
`;

export {
  ContainerStyle,
  TitleStyle,
  DividerStyle,
  MenuStyle,
  GuestBannerStyle
};
