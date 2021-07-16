import styled, { css } from "styled-components"

export const Border = styled.div`
  border: #0069f3 solid 2px;
  position: absolute;
`

export const Dot = styled.div`
  background-color: #0069f3;
  height: 8px;
  width: 8px;
  position: absolute;
  margin-left: -4px;
  margin-top: -4px;
`

export const Num = styled.div<{ isOut: boolean }>`
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;

  ${({ isOut }) =>
    isOut &&
    css`
      margin-left: -32px;
      margin-top: -32px;
    `}
`

export const DeleteButton = styled.div`
  position: absolute;
  background-color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  :hover {
    color: #40a9ff;
  }
`
