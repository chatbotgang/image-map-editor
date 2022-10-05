import { useContext } from "react";
import { Stage, Layer, Text } from "react-konva";
import { CanvasContext } from "../contexts/CanvasContextProvider";
// import Konva from 'konva'

const Canvas = () => {
  const { CANVAS_WIDTH, imageWidth, imageHeight, imageSrc } =
    useContext(CanvasContext);
  const scale = CANVAS_WIDTH / imageWidth;
  const backgroundStyles = {
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <Stage
      width={CANVAS_WIDTH}
      height={imageHeight * scale}
      style={backgroundStyles}
    >
      <Layer></Layer>
    </Stage>
  );
};

export default Canvas;
