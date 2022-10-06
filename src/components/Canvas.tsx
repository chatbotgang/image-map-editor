/**
 * @external KonvaEventObject = an object that has an 'evt' event object inside!
 * @see: {@link https://github.com/konvajs/react-konva/issues/369}
 */

import React, { useContext, useRef } from "react";
import { Stage, Layer, Group, Star, Rect } from "react-konva";
import Konva from "konva";
import { CanvasContext } from "../contexts/CanvasContextProvider";
import useMouseCoordinatesRef from "../hooks/useMouseCoordinatesRef";
import { createRectangleData } from "../utils/createRectangleData";

const Canvas = () => {
  const hasDragEventRef = useRef(false);
  const {
    CANVAS_WIDTH,
    imageWidth,
    imageHeight,
    imageSrc,
    rects,
    addRectangle,
    deleteRectangleById,
    toggleIsHoveredById,
    updateRectangleList,
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
    // when a drag event occurs, do not create a rectangle
    if (hasDragEventRef.current) {
      return;
    }

    const { offsetX, offsetY } = event.evt;
    mouseCoordinatesRef.current.downX = offsetX;
    mouseCoordinatesRef.current.downY = offsetY;
  };

  const mouseUpHandler = (event: Konva.KonvaEventObject<MouseEvent>) => {
    // when a drag event occurs, do not create a rectangle
    if (hasDragEventRef.current) {
      return;
    }

    const { offsetX, offsetY } = event.evt;
    mouseCoordinatesRef.current.upX = offsetX;
    mouseCoordinatesRef.current.upY = offsetY;

    const rectangle = createRectangleData(mouseCoordinatesRef.current);
    if (rectangle) {
      addRectangle(rectangle);
    }
    clearMouseCoordinatesRef();
  };

  const dragStartHandler = (event: Konva.KonvaEventObject<DragEvent>) => {
    console.log("drag start");
    hasDragEventRef.current = true;
  };

  const dragEndHandler =
    (event: Konva.KonvaEventObject<DragEvent>) => (id: string) => {
      console.log("drag end", event.evt);
      const { clientX, clientY, offsetX, offsetY } = event.evt;

      const updatedRects = rects.map((rect) => {
        if (rect.id !== id) {
          return rect;
        }
        return {
          ...rect,
          x: clientX - offsetX, // mouseX - horizontal distance = originX
          y: clientY - offsetY, // mouseY - vertical distance = originY
        };
      });

      updateRectangleList(updatedRects);
      hasDragEventRef.current = false;
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
        {rects.map((rect) => {
          return (
            <Group
              key={rect.id}
              draggable
              onDragStart={dragStartHandler}
              onDragEnd={(event) => dragEndHandler(event)(rect.id!)}
              onMouseEnter={() => toggleIsHoveredById(rect.id!)}
              onMouseLeave={() => toggleIsHoveredById(rect.id!)}
            >
              <Rect
                id={rect.id}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                stroke="blue"
              />
              <Star
                id={rect.id}
                x={rect.x + rect.width}
                y={rect.y}
                numPoints={6}
                innerRadius={10}
                outerRadius={20}
                fill="yellow"
                stroke="black"
                strokeWidth={2}
                visible={rect.isHovered!}
                onClick={() => deleteRectangleById(rect.id!)}
              />
            </Group>
          );
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
