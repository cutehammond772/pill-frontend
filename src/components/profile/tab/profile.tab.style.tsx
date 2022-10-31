import styled from "@emotion/styled";
import { Divider } from "@mui/joy";

const ProfileTabContent = styled.div`
  width: 300px;
  height: auto;
  background: #303030;
  border-radius: 20px;
  position: absolute;
  top: 1rem;
  right: -1rem;

  padding: 1rem;
  z-index: 5;
`;

const ProfileTabTitleContent = styled.span`
  color: white;
  font-family: Inter;
  font-weight: 500;
  font-size: 1.5rem;
  user-select: none;

  padding-top: 4px;
  padding-bottom: 4px;
`;

const ProfileTabDividerLine = styled(Divider)`
  padding-top: 20px;
  padding-bottom: 10px;
`;

const ProfileTabDividerContent = styled.span`
  letter-spacing: 0.15rem;
  font-size: 0.5rem;
  color: grey;
  font-weight: 700;
  text-transform: uppercase;
  user-select: none;
`;

const ProfileTabMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 5px;
  row-gap: 5px;
  justify-content: center;
`;

export {
  ProfileTabContent,
  ProfileTabTitleContent,
  ProfileTabDividerLine,
  ProfileTabDividerContent,
  ProfileTabMenu,
};
