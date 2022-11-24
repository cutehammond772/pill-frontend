import styled from "@emotion/styled";

import HeartIcon from "@mui/icons-material/Favorite";
import ViewIcon from "@mui/icons-material/Visibility";

import "./tablet.transition.css";

const Border = styled.div`
  min-width: 400px;
  height: auto;

  border-radius: 300px;
  background: linear-gradient(45deg, var(--tablet-pink) 20%, var(--tablet-blue) 80%);
`;

const Container = styled.div`
  border-radius: inherit;

  padding: 13px 35px 13px 35px;
  box-shadow: 0px 3px 10px var(--shadow);

  background: linear-gradient(
    45deg,
    var(--tablet-pink-hover) 20%,
    var(--tablet-blue-hover) 80%
  );

  :not(:hover) {
    --tablet-pink-hover: var(--light);
    --tablet-blue-hover: var(--light);

    margin: 5px;
    padding: 8px 30px 8px 30px;

    box-shadow: none;
  }

  & {
    transition: --tablet-pink-hover 800ms, --tablet-blue-hover 400ms, margin 200ms,
      padding 200ms, box-shadow 500ms;
  }

  display: flex;
  flex-flow: column nowrap;

  row-gap: 8px;
  justify-content: space-between;
  align-content: stretch;

  & > .title {
    font-weight: 700;
    font-size: 25px;
    color: var(--dark);

    line-height: 100%;

    overflow: hidden;
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
      font-size: 18px;
      font-weight: 600;
      color: var(--dark);
    }

    & > .menu {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      align-self: flex-end;
      column-gap: 5px;

      font-size: 15px;
      line-height: 100%;
      color: var(--dark);
    }
  }
`;

const Heart = styled(HeartIcon)`
  font-size: 15px;
`;

const View = styled(ViewIcon)`
  font-size: 15px;
`;

export { Container, Border, Heart, View };
