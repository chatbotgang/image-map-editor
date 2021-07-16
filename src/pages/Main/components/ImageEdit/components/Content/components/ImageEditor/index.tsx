import { useContext } from "react"
import { ContextStore } from "pages/Main/context/useContext"
import PlayGround from "./components/PlayGround"
import { Wrapper, Container, Img } from "./components/styledComponents"

export default function ImageEditor() {
  const context = useContext(ContextStore)

  return (
    <Wrapper>
      <Container>
        <Img alt="" src={context?.fileBase64} />
        <PlayGround />
      </Container>
    </Wrapper>
  )
}
