/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Background = css`
  background: var(--bg-h-br-t-a);
`;

const Container = styled.div`
  min-height: 1536px;

  display: flex;
  flex-flow: column nowrap;

  justify-content: flex-start;
  align-items: stretch;

  padding-top: 256px;
  padding-bottom: 512px;
`;

const Title = styled.div`
  width: auto;
  height: auto;

  display: flex;
  flex-flow: column;

  align-items: flex-start;
  box-sizing: border-box;

  color: var(--dark);

  & > .title {
    font-size: 70px;
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
      font-size: 30px;
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
        font-size: 20px;
        font-weight: 700;

        padding: 10px 15px 10px 15px;
        border-radius: 30px;
        line-height: 100%;

        background: var(--bg-h-br-t-b);
        color: var(--dark);
      }
    }
  }
`;

const Index = styled.div`
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

  & > .index_title {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    column-gap: 10px;

    & > .icon {
      width: 50px;
      font-size: 45px;
    }

    & > .title {
      font-size: 28px;
      font-weight: 700;
      line-height: 100%;
    }
  }

  & > .index_list {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;
    padding-left: 10px;
    & > .index {
      font-size: 22px;
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
`;

const ContentContainer = styled.div`
  width: auto;
  height: auto;

  display: flex;
  flex-flow: column nowrap;
  row-gap: 200px;
`;

const Content = styled.div`
  width: auto;
  height: auto;
  box-shadow: 0px 0px 20px lightgray;
  border-radius: 15px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;

  background-color: var(--light);

  & > .title_container {
    padding: 20px 20px 20px 0px;

    background-color: var(--dark);
    border-radius: 15px 15px 0px 0px;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    column-gap: 20px;

    & > .order {
      padding: 5px 15px 5px 15px;
      border-radius: 0px 10px 10px 0px;
      font-weight: 700;
      font-size: 35px;
      line-height: 100%;

      color: var(--dark);
      background: var(--pink);
    }

    & > .title {
      font-weight: 700;
      font-size: 35px;
      line-height: 100%;

      user-select: text;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      color: var(--light);
    }
  }

  & > .content_container {
    width: auto;
    height: auto;
    margin: 40px 30px 30px 30px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;

    row-gap: 40px;

    & > .text {
      word-wrap: break-word;
      white-space: pre-line;

      font-size: 25px;
      font-weight: 700;
      line-height: 150%;

      letter-spacing: 1px;
      word-spacing: 3px;
      user-select: text;

      :hover {
        font-size: 30px;
      }

      & {
        transition: font-size .5s;
      }
    }

    & > .image {
    }
  }
`;

export {
  Container,
  Title,
  Index,
  Content,
  ContentContainer,
  Background,
};
