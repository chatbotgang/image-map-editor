import styled from "styled-components"
import defaultSettings from "pages/Main/styles/defaultSettings"

const { borderRadius } = defaultSettings

export const Container = styled.div`
  width: 433px;
  height: 792px;
  background-color: #f5f9fa;
  margin-right: 135px;
  border-radius: ${borderRadius.default};
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`
