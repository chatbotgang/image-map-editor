import { useContext } from "react"
import UploadDragger from "./components/UploadDragger"
import ImageEditor from "./components/ImageEditor"
import { ContextStore } from "pages/Main/context/useContext"
import { Wrapper } from "./components/styledComponents"

export default function Content() {
  const context = useContext(ContextStore)

  return <Wrapper>{context?.fileBase64 && context?.fileBase64 !== "" ? <ImageEditor /> : <UploadDragger />}</Wrapper>
}
