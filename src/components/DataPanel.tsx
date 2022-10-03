import { useContext } from "react";
import ImageMapContext, { Rect } from "../context/ImageMapContext";
import { StyledDataPanel } from "./styles/DataPanel.styled";

const DataPanel = () => {
  const { imageResizeRatio, rects } = useContext(ImageMapContext);
  const relativeRects = rects.map((rect: Rect) => {
    return {
      x: Math.round(rect.x / imageResizeRatio),
      y: Math.round(rect.y / imageResizeRatio),
      width: Math.round(rect.width / imageResizeRatio),
      height: Math.round(rect.height / imageResizeRatio),
    };
  });
  return (
    <StyledDataPanel>
      <pre>
        {JSON.stringify(relativeRects)
          .replace("[", "[\n  ")
          .replaceAll("{", "{\n    ")
          .replaceAll("}", "\n  }")
          .replaceAll(',"', '\n    "')
          .replaceAll("},{", "},\n  {")
          .replace("]", "\n]")}
      </pre>
    </StyledDataPanel>
  );
};

export default DataPanel;
