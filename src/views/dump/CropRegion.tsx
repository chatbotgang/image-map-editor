import styled from "styled-components";

export const CropRegion = styled.div.attrs((props) => ({
  className: props.className,
}))<any>`
  position: relative;
`;
