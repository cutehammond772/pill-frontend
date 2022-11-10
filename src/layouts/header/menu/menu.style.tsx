import styled from "@emotion/styled";

const Menu = styled.div`
  display: flex;
  flex-flow: row;
  column-gap: 15px;

  // exactly align to center
  position: absolute;
  transform: translate(-50%, 15%);

  left: 50%;
`;

const MenuItem = styled.button<{ checked?: boolean }>`
  width: auto;
  height: 40px;
  border-radius: 20px;

  padding-left: 20px;
  padding-right: 20px;

  background-color: var(--light);
  color: var(--dark);

  ${(props) =>
    !!props?.checked && {
      backgroundColor: "lightblue !important",
      color: "var(--dark) !important",
    }};

  border: none;

  font-weight: 600;
  font-size: 20px;

  &:hover {
    ${(props) =>
      !props?.checked && {
        transition: "0.25s",
        backgroundColor: "pink !important",
        color: "var(--dark) !important",
      }};
  }
`;

export { Menu, MenuItem };
