import styled from "styled-components";

export const FilePlaceHolder = styled.div.attrs((props) => ({
  className: props.className,
}))<any>`
  display: flex;
  width: 100%;
  min-height: 100px;
  flex-direction: row;
  background-color: ${(props) => props.bgc};
`;

export const UploadHolder = styled.div.attrs((props) => ({
  className: props.className,
}))<any>`
  width: 355px;
  border: 3px solid #2c6dc9;
  border-radius: 7px;
  margin: auto;
  margin-top: 50px;
  overflow: hidden;
  box-sizing: content-box;
`;

export const UploadLabel = styled.label.attrs((props) => ({
  className: props.className,
}))<any>`
  border: 3px solid #e5e5ea;
  border-radius: 7px;
  background-color: #ffffff;
  width: 355px;
  height: 156px;
  margin: auto;
  margin-top: 50px;
  position: relative;
  ${(props) => props.isFile && `display:none;`}
`;

export const UploadInput = styled.input.attrs((props) => ({
  className: props.className,
}))<any>``;

export const UploadName = styled.span.attrs((props) => ({
  className: props.className,
}))<any>`
  color: #cacbcf;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
`;
