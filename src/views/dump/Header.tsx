import styled from "styled-components";

export const Header = styled.div.attrs((props) => ({
  className: props.className,
}))<any>`
  display: flex;
  border-radius: inherit;
  position: relative;
  flex-direction: row;
  width: 100%;
  height: 56px;
  background-color: #ebf0f3;
`;
