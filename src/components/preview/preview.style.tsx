import styled from "@emotion/styled";

import { Chip } from "@mui/joy";

const Container = styled.div`
  position: relative;
  width: auto;
  height: auto;

  border-radius: 10px;
  box-shadow: 0px 0px 10px var(--shadow);

  background: linear-gradient(
    45deg,
    hsla(339, 100%, 55%, 1) 0%,
    hsla(197, 100%, 64%, 1) 100%
  );
`;

const Banner = styled.div`
  position: relative;
  box-sizing: border-box;
  width: auto;
  height: auto;
  
  padding: 10px;

  background: rgba(255, 255, 255, 50%);
  border-radius: 10px 10px 0 0;

  display: flex;
  flex-flow: column;
  row-gap: 10px;

  // Title
  & > .title {
    font-weight: 700;
    color: var(--dark);

    overflow-wrap: break-word;
  }
`;

const BannerAuthor = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

const LikeButton = styled(Chip)`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(-25%, 50%);
`;

const LikeButtonContent = styled.div`
  display: flex;
  flex-flow: row;
  align-items: flex-end;
  column-gap: 5px;
`;

const History = styled.div`
  position: absolute;
  left: 15px;
  bottom: 15px;

  display: flex;
  align-items: center;
  column-gap: 0.25rem;

  color: var(--dark);
`;

export {
  Banner,
  BannerAuthor,
  Container,
  History,
  LikeButton,
  LikeButtonContent,
};
