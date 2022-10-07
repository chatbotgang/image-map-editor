/**
 * @external KonvaEventObject = an object that has an 'evt' event object inside!
 * @see: {@link https://github.com/konvajs/react-konva/issues/369}
 */
import { useContext, useState } from "react";
import { Stage, Layer } from "react-konva";
import Konva from "konva";

import { CanvasContext } from "../contexts/CanvasContextProvider";
import RectangleGroup from "./RectangleGroup";
import useMouseCoordinatesRef from "../hooks/useMouseCoordinatesRef";
import { createRectangleData } from "../utils/createRectangleData";

const Canvas = () => {
  const [hasDragEvent, setHasDragEvent] = useState(false);
  const [hasTransformEvent, setHasTransformEvent] = useState(false);
  const {
    CANVAS_WIDTH,
    imageWidth,
    imageHeight,
    imageSrc,
    rects,
    addRectangle,
  } = useContext(CanvasContext);

  const scale = CANVAS_WIDTH / imageWidth;

  const backgroundStyles = {
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const hasDragEventHandler = (flag: boolean) => {
    setHasDragEvent((prev) => flag);
  };

  const hasTransformEventHandler = (flag: boolean) => {
    setHasTransformEvent((prev) => flag);
  };

  const { mouseCoordinatesRef, clearMouseCoordinatesRef } =
    useMouseCoordinatesRef();

  const mouseDownHandler = (event: Konva.KonvaEventObject<MouseEvent>) => {
    // when a drag event occurs, it won't create a rectangle
    if (hasDragEvent || hasTransformEvent) {
      clearMouseCoordinatesRef();
      return;
    }

    // console.log("mouse down", event.evt);

    const { offsetX, offsetY } = event.evt;
    mouseCoordinatesRef.current.downX = offsetX;
    mouseCoordinatesRef.current.downY = offsetY;
  };

  const mouseUpHandler = (event: Konva.KonvaEventObject<MouseEvent>) => {
    // when a drag event occurs, it won't create a rectangle
    if (hasDragEvent || hasTransformEvent) {
      clearMouseCoordinatesRef();
      return;
    }
    // console.log("mouse up", event.evt);

    const { offsetX, offsetY } = event.evt;
    mouseCoordinatesRef.current.upX = offsetX;
    mouseCoordinatesRef.current.upY = offsetY;

    const rectangle = createRectangleData(mouseCoordinatesRef.current);
    if (rectangle) {
      addRectangle(rectangle);
    }
    clearMouseCoordinatesRef();
  };

  return (
    <Stage
      width={CANVAS_WIDTH}
      height={imageHeight * scale}
      style={backgroundStyles}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
    >
      <Layer>
        {rects.map((rect, i) => (
          <RectangleGroup
            key={i}
            rect={rect}
            hasDragEventHandler={hasDragEventHandler}
            hasTransformEventHandler={hasTransformEventHandler}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
