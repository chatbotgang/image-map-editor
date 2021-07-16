import styled from "styled-components"
import defaultSettings from "pages/Main/styles/defaultSettings"

const { borderRadius } = defaultSettings

export const Container = styled.div`
  height: 56px;
  background-color: #ecf0f3;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Circle = styled.div`
  height: 24px;
  width: 24px;
  background-color: #d4dbdf;
  border-radius: ${borderRadius.circle};
`
