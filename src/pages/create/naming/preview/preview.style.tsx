import styled from "@emotion/styled";

import { Chip } from "@mui/joy";

const ContainerStyle = styled.div`
  width: auto;
  height: auto;
  border-radius: 10px;
  background: linear-gradient(
    45deg,
    hsla(339, 100%, 55%, 1) 0%,
    hsla(197, 100%, 64%, 1) 100%
  );
  grid-row: 1 / 3;
  position: relative;
  box-shadow: 0px 0px 10px grey;
`;

const BannerStyle = styled.div`
  width: auto;
  height: auto;
  padding: 10px;

  background: rgba(255, 255, 255, 50%);
  border-radius: 10px 10px 0 0;

  display: flex;
  flex-flow: column;
  row-gap: 10px;

  position: relative;
  box-sizing: border-box;

  // Title
  & > span:nth-of-type(1) {
    font-family: Inter;
    font-weight: 700;
    color: #202020;

    overflow-wrap: break-word;
  }
`;

const BannerAuthorStyle = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  font-family: Inter;
  user-select: none;
`;

const LikeButtonStyle = styled(Chip)`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(-25%, 50%);
  user-select: none;
`;

const LikeButtonContentStyle = styled.div`
  display: flex;
  flex-flow: row;
  align-items: flex-end;
  column-gap: 5px;
`;

const HistoryStyle = styled.div`
  position: absolute;
  left: 15px;
  bottom: 15px;

  display: flex;
  align-items: center;
  column-gap: 0.25rem;

  color: #303030;
  font-family: Inter;

  user-select: none;
`;

export {
  BannerStyle,
  BannerAuthorStyle,
  ContainerStyle,
  HistoryStyle,
  LikeButtonStyle,
  LikeButtonContentStyle,
};
