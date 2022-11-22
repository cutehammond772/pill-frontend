import styled from "@emotion/styled";

import { Chip } from "@mui/joy";

const Container = styled.div`
  position: relative;
  width: auto;
  height: auto;

  border-radius: 10px;
  box-shadow: 0px 0px 10px var(--shadow);
  background: var(--bg-v-br-t-b);
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

    word-break: keep-all;
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
  align-items: center;
  line-height: 100%;
  column-gap: 5px;
`;

const History = styled.div`
  position: absolute;
  left: 15px;
  bottom: 15px;

  display: flex;
  align-items: center;
  column-gap: 0.25rem;

  line-height: 100%;
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
