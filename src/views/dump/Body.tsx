import styled from "styled-components";

export const Body = styled.div.attrs((props) => ({
  className: props.className,
}))<any>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.bgc};
`;
