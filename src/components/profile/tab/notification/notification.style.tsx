import styled from "@emotion/styled";

export const Notification = styled.div`
  width: auto;
  height: auto;

  border-radius: 15px;
  padding: 20px;

  display: grid;
  grid-template-rows: 3fr 5fr;
  grid-template-columns: 1fr 9fr;
  grid-gap: 1rem;

  & > .icon {
    grid-row: 1 / 4;

    display: flex;
    justify-content: center;
    align-items: center;

    & > * {
      font-size: 4rem;
    }
  }

  & > .title {
    font-weight: 700;
    font-size: 1.75rem;
    line-height: 100%;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > .content {
    font-size: 1.25rem;
    word-break: keep-all;
  }

  background: rgba(255, 255, 255, 0.6);
`;
