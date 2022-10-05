/**
 * @external KonvaEventObject = an object that has an 'evt' event object inside!
 * @see: {@link https://github.com/konvajs/react-konva/issues/369}
 */

import React, { useContext, useRef } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Konva from "konva";
import { CanvasContext } from "../contexts/CanvasContextProvider";
import { createRectangleData } from "../utils/createRectangleData";

const Canvas = () => {
  const {
    CANVAS_WIDTH,
    imageWidth,
    imageHeight,
    imageSrc,
    addRectangle,
    rects,
  } = useContext(CanvasContext);
  const scale = CANVAS_WIDTH / imageWidth;
  const backgroundStyles = {
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const initialRefValue = {
    downX: 0,
    downY: 0,
    upX: 0,
    upY: 0,
  };
  const mouseActionsRef = useRef(initialRefValue);
  const clearMouseActionsRef = () => {
    mouseActionsRef.current = { ...initialRefValue };
  };

  const mouseDownHandler = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const { offsetX, offsetY } = event.evt;
    mouseActionsRef.current.downX = offsetX;
    mouseActionsRef.current.downY = offsetY;
  };

  const mouseUpHandler = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const { offsetX, offsetY } = event.evt;
    mouseActionsRef.current.upX = offsetX;
    mouseActionsRef.current.upY = offsetY;

    const rectangle = createRectangleData(mouseActionsRef.current);
    clearMouseActionsRef();
    if (rectangle) {
      console.log({ rectangle });
      addRectangle(rectangle);
    }
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
