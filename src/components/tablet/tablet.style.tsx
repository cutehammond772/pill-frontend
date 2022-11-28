import styled from "@emotion/styled";

import HeartIcon from "@mui/icons-material/Favorite";
import ViewIcon from "@mui/icons-material/Visibility";

import "./tablet.transition.css";

export const Border = styled.div`
  min-width: 400px;
  height: auto;

  border-radius: 300px;
  padding: 5px;

  position: relative;
  z-index: 3;

  background: linear-gradient(
    45deg,
    var(--tablet-pink) 20%,
    var(--tablet-blue) 80%
  );
`;

export const Container = styled.div`
  border-radius: inherit;

  background: linear-gradient(
    45deg,
    var(--tablet-pink-hover) 20%,
    var(--tablet-blue-hover) 80%
  );

  :hover {
    box-shadow: 0px 3px 10px var(--shadow);
    padding: 13px 35px 13px 35px;
  }

  :not(:hover) {
    padding: 8px 30px 8px 30px;
    box-shadow: none;

    --tablet-pink-hover: var(--light);
    --tablet-blue-hover: var(--light);
  }

  & {
    transition: --tablet-pink-hover 800ms, --tablet-blue-hover 400ms,
      margin 200ms, padding 200ms, box-shadow 500ms;
  }

  display: flex;
  flex-flow: column nowrap;

  row-gap: 8px;
  justify-content: space-between;
  align-content: stretch;

  & > .title {
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--dark);

    line-height: 100%;

    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > .info {
    display: flex;
    flex-flow: row nowrap;

    column-gap: 30px;
    justify-content: space-between;
    align-content: center;

    & > .author {
      font-size: 1rem;
      font-weight: 600;
      color: var(--dark);
    }

    & > .menu {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      align-self: flex-end;
      column-gap: 5px;

      font-size: 0.8rem;
      line-height: 100%;
      color: var(--dark);
    }
  }
`;

export const Heart = styled(HeartIcon)`
  font-size: 0.8rem;
`;

export const View = styled(ViewIcon)`
  font-size: 0.8rem;
`;
