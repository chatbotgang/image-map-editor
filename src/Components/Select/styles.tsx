import styled from "styled-components";
import { iArea } from "../../Hooks/useUploadFile/types";

interface iSelectWrapper {
  area: iArea;
}

export const SelectWrapper = styled.div<iSelectWrapper>`
  padding-top: ${(props) => props.area.size.height}px;
  padding-left: ${(props) => props.area.size.width}px;
  top: ${(props) => props.area.position.Y}px;
  left: ${(props) => props.area.position.X}px;
  position: absolute;
  border: 1px dashed black;
  background: rgba(0, 0, 0, 0, 0);
  user-select: none;
`;

export const DeleteWrapper = styled.div<iSelectWrapper>`
  background: white;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  padding-top: 5px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  left: ${(props) => props.area.size.width}px;
`;
