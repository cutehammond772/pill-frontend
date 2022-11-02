/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Chip } from "@mui/joy";

const LayoutNamingPill = css`
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 300px 1fr;
`;

const NamingPillTitleContent = styled.div`
  margin-left: 30px;
  padding: 15px;
  border-radius: 15px;

  display: flex;
  flex-flow: column;
  justify-content: space-between;
  row-gap: 15px;

  background: grey;

  // Title Text
  & > span {
    font-family: Inter;
    font-weight: 700;
    color: #202020;
    font-size: 2rem;
    line-height: 100%;
  }
`;

const NamingPillCategoriesContent = styled.div`
  margin-left: 30px;
  margin-top: 15px;
  padding: 15px;
  border-radius: 15px;

  display: flex;
  flex-flow: column;
  justify-content: space-between;
  row-gap: 15px;

  background: grey;

  // Categories Text
  & > span {
    font-family: Inter;
    font-weight: 700;
    color: #202020;
    font-size: 2rem;
    line-height: 100%;
  }
`;

const PreviewPillContent = styled.div`
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

const PreviewPillBanner = styled.div`
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
  }
`;

const PreviewPillBannerAuthor = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  font-family: Inter;
  user-select: none;
`;

const PreviewPillLikeButton = styled(Chip)`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(-25%, 50%);
  user-select: none;
`;

const PreviewPillLikeButtonContent = styled.div`
  display: flex;
  flex-flow: row;
  align-items: flex-end;
  column-gap: 5px;
`;

const PreviewPillPreviewBadge = styled(Chip)`
  position: absolute;
  right: 5px;
  bottom: 5px;
  user-select: none;
`;

const PreviewPillHistory = styled.div`
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
  LayoutNamingPill,

  NamingPillCategoriesContent,
  NamingPillTitleContent,

  PreviewPillBanner,
  PreviewPillBannerAuthor,
  PreviewPillContent,
  PreviewPillHistory,
  PreviewPillLikeButton,
  PreviewPillLikeButtonContent,
  PreviewPillPreviewBadge,
};
