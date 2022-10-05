/**
 * @external KonvaEventObject = an object that has an 'evt' event object inside!
 * @see: {@link https://github.com/konvajs/react-konva/issues/369}
 */

import React, { useContext } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Konva from "konva";
import { CanvasContext } from "../contexts/CanvasContextProvider";
import useMouseCoordinatesRef from "../hooks/useMouseCoordinatesRef";
import { createRectangleData } from "../utils/createRectangleData";

const Canvas = () => {
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

  const { mouseCoordinatesRef, clearMouseCoordinatesRef } =
    useMouseCoordinatesRef();

  const mouseDownHandler = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const { offsetX, offsetY } = event.evt;
    mouseCoordinatesRef.current.downX = offsetX;
    mouseCoordinatesRef.current.downY = offsetY;
  };

  const mouseUpHandler = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const { offsetX, offsetY } = event.evt;
    mouseCoordinatesRef.current.upX = offsetX;
    mouseCoordinatesRef.current.upY = offsetY;

    const rectangle = createRectangleData(mouseCoordinatesRef.current);
    if (rectangle) {
      console.log({ rectangle });
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
        {rects.map((rect) => (
          <Rect
            key={rect.id}
            id={rect.id}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            stroke="blue"
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
