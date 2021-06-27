import styled from "styled-components";

export const Avatar = styled.div.attrs((props) => ({
  className: props.className,
}))<any>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 5%;
  border-radius: 50%;
  margin: auto;
  width: 24px;
  height: 24px;
  background-color: #d5dade;
`;
