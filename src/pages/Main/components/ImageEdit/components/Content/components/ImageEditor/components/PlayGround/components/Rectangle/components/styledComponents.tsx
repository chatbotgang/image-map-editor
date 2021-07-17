import styled, { css } from "styled-components"
import defaultSettings from "pages/Main/styles/defaultSettings"

const { borderRadius } = defaultSettings
const { dotSize, borderWidth } = defaultSettings.rectangle

const RECTANGLE_COLOR = "#0069f3"

export const Border = styled.div`
  border: ${RECTANGLE_COLOR} solid ${borderWidth}px;
  position: absolute;
`

export const Dot = styled.div`
  background-color: ${RECTANGLE_COLOR};
  height: ${dotSize}px;
  width: ${dotSize}px;
  position: absolute;
`

export const Num = styled.div<{ isOut: boolean }>`
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: ${borderRadius.circle};

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
  border-radius: ${borderRadius.default};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  :hover {
    color: #40a9ff;
  }
`
