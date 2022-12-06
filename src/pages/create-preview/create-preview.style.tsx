/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Background = css`
  background: var(--bg-h-br-t-a);
`;

export const Container = styled.div`
  min-height: 1536px;

  display: flex;
  flex-flow: column nowrap;

  justify-content: flex-start;
  align-items: stretch;

  padding-top: 256px;
  padding-bottom: 512px;

  @media screen and (max-width: 768px) {
    padding-top: 128px;
    padding-bottom: 256px;
  }
`;

export const Title = styled.div`
  width: auto;
  height: auto;

  display: flex;
  flex-flow: column;

  align-items: flex-start;
  box-sizing: border-box;

  color: var(--dark);

  & > .title {
    font-size: 4.5rem;
    font-weight: 700;

    word-break: keep-all;
    user-select: text;
  }

  & > .info {
    align-self: stretch;

    display: flex;
    flex-flow: row wrap;

    justify-content: space-between;
    align-items: center;

    row-gap: 10px;
    padding-top: 20px;

    & > .user {
      font-size: 2rem;
      font-weight: 700;

      user-select: text;
      text-transform: uppercase;

      :hover {
        cursor: pointer;
        text-shadow: 0px 0px 10px var(--shadow);
      }

      & {
        transition: text-shadow 400ms;
      }
    }

    & > .categories {
      display: flex;
      flex-flow: row wrap;
      column-gap: 20px;

      & > .category {
        font-size: 1.25rem;
        font-weight: 700;

        padding: 10px 15px 10px 15px;
        border-radius: 30px;
        line-height: 100%;

        background: var(--bg-h-br-t-b);
        color: var(--dark);
      }
    }
  }

  // mobile
  @media screen and (max-width: 768px) {
    & > .title {
      font-size: 3rem;
    }

    & > .info {
      & > .user {
        font-size: 1.75rem;
      }

      & > .categories {
        column-gap: 10px;

        & > .category {
          font-size: 1.25rem;
        }
      }
    }
  }
`;

export const Index = styled.div`
  width: auto;
  height: auto;
  box-shadow: 0px 0px 20px lightgray;
  border-radius: 20px;
  background-color: var(--light);

  margin: 200px 0px 20px 0px;
  padding: 15px 15px 20px 15px;
  row-gap: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;

  & > .index-title {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    column-gap: 10px;

    & > .icon {
      width: 50px;
      font-size: 2.75rem;
    }

    & > .title {
      font-size: 1.75rem;
      font-weight: 700;
      line-height: 100%;
    }
  }

  & > .index-list {
    padding-left: 10px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;

    row-gap: 10px;
    & > .index {
      font-size: 1.5rem;
      letter-spacing: 0.1rem;
      font-weight: 700;

      cursor: pointer;

      :hover {
        padding-left: 10px;
        text-shadow: 0px 0px 10px var(--shadow);
      }

      & {
        transition: padding-left 300ms, text-shadow 300ms;
      }
    }
  }

  @media screen and (max-width: 768px) {
    margin: 100px 0px 20px 0px;
    padding: 10px 10px 15px 10px;
    row-gap: 10px;

    & > .index-title {
      column-gap: 10px;

      & > .icon {
        font-size: 2.25rem;
      }

      & > .title {
        font-size: 1.5rem;
      }
    }

    & > .index-list {
      & > .index {
        font-size: 1.25rem;

        :hover {
          padding-left: 5px;
        }
      }
    }
  }
`;

export const ContentContainer = styled.div`
  width: auto;
  height: auto;

  display: flex;
  flex-flow: column nowrap;
  row-gap: 200px;
`;

export const Content = styled.div`
  width: auto;
  height: auto;
  box-shadow: 0px 0px 20px lightgray;
  border-radius: 15px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;

  background-color: var(--light);

  & > .title-container {
    padding: 20px 20px 20px 0px;

    background-color: var(--dark);
    border-radius: 15px 15px 0px 0px;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    column-gap: 20px;

    & > .order {
      padding: 5px 15px 5px 20px;

      font-size: 2.25rem;
      font-weight: 700;
      line-height: 100%;

      color: var(--light);
    }

    & > .title {
      font-weight: 700;
      font-size: 2rem;
      line-height: 100%;

      user-select: text;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      color: var(--light);
    }
  }

  & > .content-container {
    width: auto;
    height: auto;
    margin: 2rem 30px 30px 30px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;

    row-gap: 4rem;

    & > .text {
      word-wrap: break-word;
      white-space: pre-line;

      font-size: 1.25rem;
      font-weight: 500;

      user-select: text;
    }

    & > .image {
    }
  }
`;
