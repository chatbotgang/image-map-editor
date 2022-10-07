import React, {
  useContext,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Group, Star, Rect, Transformer } from "react-konva";
import Konva from "konva";

import { CanvasContext } from "../contexts/CanvasContextProvider";

import { Rect as RectClass } from "konva/lib/shapes/Rect";
import { Transformer as TransformerClass } from "konva/lib/shapes/Transformer";
import { Rectangle } from "../types";

type RectangleGroupProps = {
  rect: Rectangle;
  hasDragEventHandler: (flag: boolean) => void;
};

const RectangleGroup = ({ rect, hasDragEventHandler }: RectangleGroupProps) => {
  const transformerRef = useRef<TransformerClass | null>(null);
  const shapeRef = useRef<RectClass | null>(null);
  // const hasDragEventRef = useRef(false);
  const {
    CANVAS_WIDTH,
    imageWidth,
    rects,
    deleteRectangleById,
    toggleIsHoveredById,
    toggleIsSelectedById,
    updateRectangle,
    updateRectangleList,
  } = useContext(CanvasContext);

  const scale = CANVAS_WIDTH / imageWidth;

  const dragStartHandler = (event: Konva.KonvaEventObject<DragEvent>) => {
    console.log("drag start");
    // a drag event begins
    // hasDragEventRef.current = true;
    hasDragEventHandler(true);
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

      // a drag event is done
      hasDragEventHandler(false);
      // hasDragEventRef.current = false;
    };

  useEffect(() => {
    if (!rect.isSelected) {
      return;
    }

    transformerRef.current!.nodes([shapeRef.current!]);
    transformerRef.current!.getLayer()!.batchDraw();
  }, [rect.isSelected]);

  return (
    <Group
      key={rect.id}
      draggable
      onDragStart={dragStartHandler}
      onDragEnd={(event) => dragEndHandler(event)(rect.id)}
      onMouseEnter={() => toggleIsHoveredById(rect.id)}
      onMouseLeave={() => toggleIsHoveredById(rect.id)}
      onClick={() => toggleIsSelectedById(rect.id)}
    >
      <Rect
        ref={shapeRef}
        id={rect.id}
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        stroke={rect.isSelected ? "red" : "blue"}
        onTransformEnd={(event) => {
          console.log("transformerend");
          const node = shapeRef.current!;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          console.log({ scaleX, scaleY });

          updateRectangle({
            ...rect,
            x: node.x(),
            y: node.y(),
            width: Math.max(20, node.width() * scaleX),
            height: Math.max(20, node.height() * scaleY),
          });
        }}
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
        visible={rect.isHovered}
        onClick={() => deleteRectangleById(rect.id)}
      />
      {rect.isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            console.log("boundboxfunc");
            if (newBox.width < 20 || newBox.height < 20) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Group>
  );
};

export default RectangleGroup;
