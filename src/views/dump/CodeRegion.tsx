import styled from "styled-components";

export const CodeRegion = styled.div.attrs((props) => ({
  className: props.className,
}))<any>`
  padding: 20px;
  text-align: left;
  color: #e2ecfa;
  white-space: pre-line;
`;
