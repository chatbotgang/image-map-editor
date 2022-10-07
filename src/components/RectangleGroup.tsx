import React, { useContext, useRef, useEffect } from "react";
import { Group, Star, Rect, Transformer } from "react-konva";
import Konva from "konva";

import { CanvasContext } from "../contexts/CanvasContextProvider";

import { Rect as RectClass } from "konva/lib/shapes/Rect";
import { Transformer as TransformerClass } from "konva/lib/shapes/Transformer";
import { Rectangle } from "../types";
import { Group as GroupClass } from "konva/lib/Group";

type RectangleGroupProps = {
  rect: Rectangle;
  hasDragEventHandler: (flag: boolean) => void;
  hasTransformEventHandler: (flag: boolean) => void;
};

const RectangleGroup = ({
  rect,
  hasDragEventHandler,
  hasTransformEventHandler,
}: RectangleGroupProps) => {
  const transformerRef = useRef<TransformerClass | null>(null);
  const groupRef = useRef<GroupClass | null>(null);
  const shapeRef = useRef<RectClass | null>(null);
  // const hasDragEventRef = useRef(false);
  const {
    rects,
    deleteRectangleById,
    toggleIsHoveredById,
    toggleIsSelectedById,
    updateRectangle,
    updateRectangleList,
  } = useContext(CanvasContext);

  const dragStartHandler = (event: Konva.KonvaEventObject<DragEvent>) => {
    hasDragEventHandler(true);
  };

  const dragEndHandler =
    (event: Konva.KonvaEventObject<DragEvent>) => (id: string) => {
      const { clientX, clientY, offsetX, offsetY } = event.evt;

      // console.log("====== drag ends", {
      //   clientX,
      //   clientY,
      //   offsetX,
      //   offsetY,
      // });
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
      stroke="black"
      strokeWidth={10}
      draggable
      ref={groupRef}
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
        onTransformStart={() => hasTransformEventHandler(true)}
        onTransform={() => hasTransformEventHandler(true)}
        onTransformEnd={(event) => {
          console.log("transformerend");
          const node = shapeRef.current!;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // console.log({ scaleX, scaleY, width, height });

          node.scaleX(1);
          node.scaleY(1);
          updateRectangle({
            ...rect,
            x: node.x(),
            y: node.y(),
            width: Math.max(20, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });

          hasTransformEventHandler(false);
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
