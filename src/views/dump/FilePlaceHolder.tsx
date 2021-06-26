import styled from "styled-components";

export const FilePlaceHolder = styled.div.attrs((props) => ({
  className: props.className,
}))<any>`
  display: flex;
  width: 200px;
  min-height: 100px;
  flex-direction: row;
  background-color: ${(props) => props.bgc};
`;
