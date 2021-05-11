import styled from 'styled-components';
import { Trash as TrashIcon } from '../../Icons';

export const Container = styled.div`
  width: 355px;
  box-sizing: border-box;
  border: 2px solid blue;
  border-radius: 8px;
  margin: 0 auto;
  user-select: none;
  position: relative;
  cursor: crosshair;
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  border-radius: 6px;
  pointer-events: none;
`;

export const RecordItemContainer = styled.div`
  position: absolute;
  border: 1px solid blue;
  pointer-events: none;

  &::before {
    display: flex;
    content: attr(data-position);
    width: 20px;
    height: 20px;
    background-color: #ffffffaa;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    transform: translate(4px, 4px);
    float: left;
  }
`;

export const RecordItemHandlersContainer = styled.div`
  position: relative;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  margin: -1px;
  pointer-events: none;
`;

export const RecordItemHandler = styled.div`
  width: 5px;
  height: 5px;
  position: absolute;
  background-color: blue;
  &: nth-child(1) {
    left: -2px;
    top: -2px;
    cursor: nwse-resize;
  }
  &: nth-child(2) {
    right: -2px;
    top: -2px;
    cursor: nesw-resize;
  }
  &: nth-child(3) {
    left: -2px;
    bottom: -2px;
    cursor: nwse-resize;
  }
  &: nth-child(4) {
    right: -2px;
    bottom: -2px;
    cursor: nesw-resize;
  }
  &: nth-child(5) {
    left: calc(50% - 2px);
    top: -2px;
    cursor: ns-resize;
  }
  &: nth-child(6) {
    right: -2px;
    top: calc(50% - 2px);
    cursor: ew-resize;
  }
  &: nth-child(7) {
    left: calc(50% - 2px);
    bottom: -2px;
    cursor: ns-resize;
  }
  &: nth-child(8) {
    left: -2px;
    top: calc(50% - 2px);
    cursor: ew-resize;
  }
`;

export const StyledTrashIcon = styled(TrashIcon)`
  width: 14px;
  height: 16px;
  pointer-events: none;
`;

export const DeleteButton = styled.div.attrs({
  role: 'button',
})`
  position: absolute;
  top: -4px;
  right: -28px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  color: rgb(152, 157, 159);
  cursor: pointer;
  pointer-events: auto;
`;
