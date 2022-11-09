import styled from "@emotion/styled";

const LogoStyle = styled.div<{ scale?: number }>`
  width: calc(50px * ${(props) => props.scale || 1});
  height: calc(20px * ${(props) => props.scale || 1});

  border-radius: calc(10px * ${(props) => props.scale || 1});
  background: linear-gradient(
    90deg,
    hsla(339, 100%, 55%, 1) 0%,
    hsla(197, 100%, 64%, 1) 100%
  );
`;

export { LogoStyle };
