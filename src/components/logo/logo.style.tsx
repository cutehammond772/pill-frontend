import styled from "@emotion/styled";

const Logo = styled.div`
  min-width: 50px;
  min-height: 20px;

  cursor: pointer;

  border-radius: 100px;
  background: var(--bg-h-rb-f-c);

  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;

  & > .title_container {
    width: auto;
    height: auto;
    border-radius: 100px;

    display: flex;
    justify-content: center;
    align-items: center;

    flex-flow: row nowrap;
    column-gap: 5px;

    background-color: var(--dark);

    margin: 0;
    padding: 0;
    opacity: 0;

    & > .title {
      line-height: 100%;
      font-weight: 500;

      font-size: 0px;
      opacity: 0;

      color: var(--light);
    }

    & > .icon > * {
      position: relative;
      top: 2px;

      font-weight: 500;
      font-size: 0px;
      opacity: 0;

      color: var(--light);
    }
  }

  // tablet (768px)
  @media screen and (max-width: 768px) {
    & > .title_container {
      width: auto;
      height: auto;

      margin: 5px;
      padding: 2px 20px 2px 20px;
      opacity: 1;

      & > .title {
        font-size: 20px;
        opacity: 1;
      }

      & > .icon > * {
        font-size: 30px;
        opacity: 1;
      }
    }
  }
`;

export { Logo };
