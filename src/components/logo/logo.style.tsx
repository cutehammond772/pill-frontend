import styled from "@emotion/styled";

const LogoStyle = styled.div<{ scale?: number }>`
  // default scale: (width: 50px height: 20px) => scale 1x
  width: calc(50px * ${(props) => props.scale || 1});
  height: calc(20px * ${(props) => props.scale || 1});

  cursor: pointer;

  border-radius: calc(10px * ${(props) => props.scale || 1});
  background: var(--bg-h-rb-f-c);
`;

export { LogoStyle };
