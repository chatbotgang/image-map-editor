import { useContext } from "react";
import { CodeRegion } from "../../dump/CodeRegion";
import ReactHtmlParser from "react-html-parser";
import { ImgEditorVMContext } from "../../../presenters/Upload/uploadVM";

export const JSONPreview = () => {
  const { layoutState } = useContext(ImgEditorVMContext);
  // console.log(JSON.stringify(layoutState));
  const formattedText = JSON.stringify(layoutState)
    .replace(/([,])/g, "$1\n&nbsp;&nbsp;&nbsp;&nbsp;")
    .replace(/([{])/g, "$1\n&nbsp;&nbsp;&nbsp;&nbsp;")
    .replace(/(})/g, "\n$1");
  // console.log(formattedText);
  return <CodeRegion>{ReactHtmlParser(formattedText)}</CodeRegion>;
};
