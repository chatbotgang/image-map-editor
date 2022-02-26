import styled from "styled-components";
import { iArea } from "../../Hooks/useUploadFile/types";

export const Container = styled.div`
  position: relative;
`;

interface iSelectWrapper {
  area: iArea;
}

export const SelectWrapper = styled.div<iSelectWrapper>`
  min-width: ${(props) => props.area.size.width};
  min-height: ${(props) => props.area.size.height};
  top: ${(props) => props.area.position.Y};
  left: ${(props) => props.area.position.X};
  position: absolute;
  border: 0.5px dashed black;
  background: rgba(0, 0, 0, 0, 0);
`;
