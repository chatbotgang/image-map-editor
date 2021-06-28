import styled from "styled-components";

interface SelectionElementProps {
  layout: ILayoutState;
  cropIndex: string;
}

export const SelectionElement = styled.div.attrs<SelectionElementProps>(
  (props) => ({
    className: props.className,
    id: props.cropIndex,
    style: {
      left: String(props.layout.x) + "px",
      top: String(props.layout.y) + "px",
      width: String(props.layout.width) + "px",
      height: String(props.layout.height) + "px",
    },
  })
)<SelectionElementProps>`
  position: absolute;
  transform: translate(-50%, -50%);
`;

interface Props {
  readonly ord: string;
}

export const DragBar = styled.div.attrs((props) => ({
  className: props.className,
}))<Props>`
  position: absolute;
  ${(props) => props.ord === "n" && `width: 100%; height:0;top:0;`};
  ${(props) => props.ord === "w" && `width: 0; height:100%;left:0;`};
  ${(props) => props.ord === "s" && `width: 100%; height:0; bottom:0;`};
  ${(props) => props.ord === "e" && `width: 0; height:100%;right:0;`};
  border: 1px solid #3961e4;
`;

export const DragPoint = styled.div.attrs((props) => ({
  className: props.className,
}))<Props>`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #3961e4;
  margin: auto;
  ${(props) =>
    props.ord === "n" && `top:0;left:0;right:0;transform:translate(0, -40%)`};
  ${(props) =>
    props.ord === "nw" && `top:0;left:0;transform:translate(-40%, -40%)`};
  ${(props) =>
    props.ord === "ne" && `top:0;right:0;transform:translate(40%, -40%)`};
  ${(props) =>
    props.ord === "e" && `top:0;right:0;bottom:0;transform:translate(40%, 0)`};
  ${(props) =>
    props.ord === "se" && `bottom:0;right:0;transform:translate(40%, 40%)`};
  ${(props) =>
    props.ord === "s" && `left:0;right:0;bottom:0;transform:translate(0, 40%)`};
  ${(props) =>
    props.ord === "sw" && `left:0;bottom:0;transform:translate(-40%, 40%)`};
  ${(props) =>
    props.ord === "w" && `top:0;bottom:0;left:0;transform:translate(-40%, 0)`};
`;

export const DeleSelection = styled.button.attrs((props) => ({
  className: props.className,
}))<any>`
  position: absolute;
  top: 0;
  left: 100%;
`;
