import styled from "@emotion/styled";

const HeaderContent = styled.header`
    position: sticky;
    z-index: 1;
    top: 0;

    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
    align-items: center;

    margin-top: 3rem;

    padding-top: 2rem;
    padding-bottom: 2rem;
`;

export { HeaderContent };