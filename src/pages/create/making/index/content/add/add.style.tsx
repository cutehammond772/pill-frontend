/** @jsxImportSource '@emotion/react' */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ContainerLayout = css`
  display: flex;
  flex-flow: column nowrap;

  background-color: var(--light);

  & > .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;

    @media screen and (max-width: 768px) {
      display: flex;
      flex-flow: column nowrap;
      row-gap: 10px;
    }
  }
`;

export const AddContentButton = styled.div`
  width: auto;
  height: auto;

  border-radius: 15px;
  padding: 12px;

  flex-grow: 1;
  min-width: 0;

  display: flex;
  flex-flow: column nowrap;
  row-gap: 10px;

  background: var(--bg-h-br-t-a);
  color: var(--dark);

  cursor: pointer;

  :hover {
    box-shadow: 0px 0px 5px var(--shadow);
  }

  transition: box-shadow 300ms;

  & > .title {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    column-gap: 10px;

    & > .icon {
      font-size: 2rem;
      line-height: 100%;
    }

    & > .content {
      font-weight: 600;
      font-size: 1.5rem;
      line-height: 100%;

      white-space: nowrap;
    }
  }

  & > .description {
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 100%;

    color: var(--dark);

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (max-width: 992px) {
    padding: 10px;

    & > .title {
      & > .icon {
        font-size: 1.75rem;
      }

      & > .content {
        font-size: 1.25rem;
      }
    }

    & > .description {
      font-size: 1rem;
    }
  }
`;
