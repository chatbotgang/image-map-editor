import styled from "styled-components"
import ImageEdit from "./components/ImageEdit"
import DataDisplay from "./components/DataDisplay"
import { ContextProvider } from "./context/useContext"
import type {} from "styled-components/cssprop"

const Wrapper = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  min-width: 1200px;
  * {
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

const Container = styled.div`
  display: flex;
`

export default function Main() {
  return (
    <ContextProvider>
      <Wrapper>
        <Container>
          <ImageEdit />
          <DataDisplay />
        </Container>
      </Wrapper>
    </ContextProvider>
  )
}
