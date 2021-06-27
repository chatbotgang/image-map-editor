import styled from "styled-components";

export const SectionContainer = styled.div.attrs((props) => ({
  className: props.className,
}))<any>`
  display: inline-flex;
  flex-wrap: wrap;
  margin-top: 50px;
  gap: 135px;
  flex-direction: row;
  justify-content: center;
  align-item: flex-start;
  background-color: ${(props) => props.bgc};
`;
