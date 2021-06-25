import styled from "styled-components";

export const Header = styled.div.attrs((props) => ({
  className: props.className,
}))<any>`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.bgc};
`;
