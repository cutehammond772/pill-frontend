import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/react";

export const Container = styled.div<{ layout: SerializedStyles }>`
  width: auto;
  height: auto;

  padding: 15px;
  border-radius: 20px;

  background-color: var(--light);
  row-gap: 15px;

  @media screen and (max-width: 992px) {
    padding: 10px;
    row-gap: 10px;
  }

  @media screen and (max-width: 768px) {
    padding: 10px;
    row-gap: 5px;
  }

  ${(props) => props.layout};
`;

export const Title = styled.div<{ layout?: SerializedStyles }>`
  display: flex;
  flex-flow: row;
  column-gap: 10px;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  & > .container {
    display: flex;
    flex-flow: row;
    column-gap: 10px;
    align-items: center;
    color: var(--dark);
    min-width: 0;

    & > .icon {
      font-size: 2rem;
    }

    & > .title {
      font-weight: 600;
      font-size: 1.5rem;
      line-height: 100%;

      white-space: nowrap;
    }

    & > .description {
      margin-left: 10px;

      font-weight: 600;
      font-size: 1.1rem;
      line-height: 100%;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      color: var(--sub);
    }

    // tablet
    @media screen and (max-width: 992px) {
      & > .icon {
        font-size: 1.75rem;
      }

      & > .title {
        font-size: 1.25rem;
      }

      & > .description {
        font-size: 1rem;
      }
    }

    // mobile
    @media screen and (max-width: 768px) {
      & > .icon {
        font-size: 1.5rem;
      }

      & > .title {
        font-size: 1rem;
      }

      & > .description {
        display: none;
      }
    }
  }

  ${(props) => props.layout};
`;

export const MenuButtons = styled.div<{ open: boolean }>`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: 10px;

  transform: ${(props) =>
    props.open ? "none" : "translateX(calc(100% - 30px))"};
  transition: transform 600ms;

  // tablet
  @media screen and (max-width: 992px) {
    column-gap: 5px;
  }
`;
