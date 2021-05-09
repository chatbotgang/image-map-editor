import styled from 'styled-components';

export const Container = styled.div`
  width: 355px;
  box-sizing: border-box;
  border: 2px solid blue;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto;
  user-select: none;
  position: relative;
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  pointer-events: none;
`;

export const RecordItemContainer = styled.div`
  position: absolute;
  border: 1px solid blue;

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
`;

export const RecordItemHandler = styled.div`
  width: 5px;
  height: 5px;
  position: absolute;
  background-color: blue;
  &: nth-child(1) {
    left: -2px;
    top: -2px;
  }
  &: nth-child(2) {
    right: -2px;
    top: -2px;
  }
  &: nth-child(3) {
    left: -2px;
    bottom: -2px;
  }
  &: nth-child(4) {
    right: -2px;
    bottom: -2px;
  }
  &: nth-child(5) {
    left: calc(50% - 2px);
    top: -2px;
  }
  &: nth-child(6) {
    right: -2px;
    top: calc(50% - 2px);
  }
  &: nth-child(7) {
    left: calc(50% - 2px);
    bottom: -2px;
  }
  &: nth-child(8) {
    left: -2px;
    top: calc(50% - 2px);
  }
`;
