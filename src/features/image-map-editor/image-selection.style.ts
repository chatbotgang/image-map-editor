import styled from 'styled-components';

export const SelectionNum = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #f2f2f2;
  color: #222;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  padding: 0;
  position: absolute;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: -30px;
  border: none;
  width: 24px;
  height: 24px;
  background: #f2f2f2;
  color: #949494;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.25);
`;

export const Selection = styled.div`
  position: relative;
  border: 1px solid #086ae0;
  width: 100%;
  height: 100%;
`;

export const DragHandler = styled.div`
  width: 100%;
  height: 100%;
  cursor: move;
`;

export const Dot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: #086ae0;
  
  &[data-index="0"] {
    top: -4px;
    left: -4px;
  }
  &[data-index="1"] {
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
  }
  &[data-index="2"] {
    top: -4px;
    right: -4px;
  }
  &[data-index="3"] {
    top: 50%;
    left: -4px;
    transform: translateY(-50%);
  }
  &[data-index="4"] {
    top: 50%;
    right: -4px;
    transform: translateY(-50%);
  }
  &[data-index="5"] {
    bottom: -4px;
    left: -4px;
  }
  &[data-index="6"] {
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
  }
  &[data-index="7"] {
    bottom: -4px;
    right: -4px;
  }
`;
