import { useContext } from "react";
import { CodeRegion } from "../../dump/CodeRegion";
import ReactHtmlParser from "react-html-parser";
import { ImgEditorVMContext } from "../../../presenters/Upload/uploadVM";

export const JSONPreview = () => {
  const {
    state: { cropSelectionDict },
  } = useContext(ImgEditorVMContext);

  const formattedText = JSON.stringify(
    Object.keys(cropSelectionDict).map((ele: any) => cropSelectionDict[ele])
  )
    .replace(/([,])/g, "$1\n&nbsp;&nbsp;&nbsp;&nbsp;")
    .replace(/([{])/g, "$1\n&nbsp;&nbsp;&nbsp;&nbsp;")
    .replace(/\n&nbsp;&nbsp;&nbsp;&nbsp;"isMoving":(false|true,)/g, "")
    .replace(/(})/g, "\n$1");
  return <CodeRegion>{ReactHtmlParser(formattedText)}</CodeRegion>;
};
