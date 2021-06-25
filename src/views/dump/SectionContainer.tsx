import styled from "styled-components";

export const SectionContainer = styled.div.attrs((props) => ({
  className: props.className,
}))<any>`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.bgc};
`;
