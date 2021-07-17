import styled from "styled-components"
import defaultSettings from "pages/Main/styles/defaultSettings"

const { borderRadius } = defaultSettings

export const Wrapper = styled.div`
  height: 703px;
  width: 548px;
  background-color: #2a3948;
  border-radius: ${borderRadius.default};
  padding: 20px;
  color: #fff;
  overflow: auto;
`

export const Container = styled.div`
  display: flex;
  width: 100%;
`

export const StartEnd = styled.div`
  width: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

export const Result = styled.div`
  padding-bottom: 1em;
`
