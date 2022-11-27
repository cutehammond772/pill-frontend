import styled from "@emotion/styled";

const Menu = styled.div`
  display: flex;
  flex-flow: row nowrap;
  column-gap: 15px;

  // exactly align to center
  position: absolute;
  transform: translate(-50%, 15%);

  left: 50%;

  // desktop (992px)
  @media screen and (max-width: 992px) {
    column-gap: 10px;
    border-radius: 100px;
  }

  // tablet (768px)
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.button<{ selected?: boolean }>`
  width: auto;
  height: 40px;
  border-radius: 20px;

  padding-left: 20px;
  padding-right: 20px;

  white-space: nowrap;

  background-color: var(--dark);
  color: var(--light);

  cursor: ${(props) => (!!props.selected ? "default" : "pointer")};

  ${(props) =>
    !!props?.selected && {
      backgroundColor: "var(--blue) !important",
      color: "var(--dark) !important",
    }};

  border: none;

  font-weight: 600;
  font-size: 20px;
  line-height: 100%;

  transition: background-color 200ms, color 200ms;

  :hover {
    ${(props) =>
      !props?.selected && {
        backgroundColor: "pink !important",
        color: "var(--dark) !important",
      }};
  }

  // desktop (992px)
  @media screen and (max-width: 992px) {
    font-size: 18px;
  }
  
`;

export { Menu, MenuItem };
