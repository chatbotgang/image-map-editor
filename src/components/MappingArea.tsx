import "./MappingArea.css";
import { Mapping, Base64Image, ImageDimensions } from '../types';
import MappingBlock from "./MappingBlock";
import { List } from "immutable";
import { MouseEvent, useCallback, useEffect, useState } from "react";

type MappingAreaProps = {
  createMapping: (value: Mapping) => void;
  editMapping: (index: number, value: Partial<Mapping>) => void;
  deleteMapping: (index: number) => void;
  mappings: List<Mapping>;
  image: Base64Image;
  originalImageDimensions: ImageDimensions;
};

const IMAGE_DISPLAY_WIDTH = 355;

function getImageDisplayHeight(imageHeight: number, imageWidth: number, imageDisplayWidth: number): number {
  return imageHeight / imageWidth * imageDisplayWidth;
}

function scaleFromUIToOriginal(x: number, y: number, imageDimensions: ImageDimensions): {
  x: number;
  y: number;
} {
  const imageDisplayHeight = getImageDisplayHeight(imageDimensions.height, imageDimensions.width, IMAGE_DISPLAY_WIDTH);
  const originalX = x / IMAGE_DISPLAY_WIDTH * imageDimensions.width;
  const originalY = y / imageDisplayHeight * imageDimensions.height;
  return {
    x: originalX,
    y: originalY
  }
}

function getMouseUIXY(event: React.MouseEvent | MouseEvent | globalThis.MouseEvent, boundingClientRect: DOMRect, originalImageDimensions: ImageDimensions) {
  const { left: areaLeft, top: areaTop, right: areaRight, bottom: areaBottom } = boundingClientRect;
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  let uiX = mouseX - areaLeft;
  let uiY = mouseY - areaTop;

  if (mouseX <= areaLeft) {
    uiX = 0;
  }
  if (mouseX >= areaRight) {
    uiX = areaRight - areaLeft;
  }
  if (mouseY <= areaTop) {
    uiY = 0;
  }
  if (mouseY >= areaBottom) {
    uiY = areaBottom - areaTop;
  }

  return { uiX, uiY }
}

export default function MappingArea({
  mappings,
  image,
  originalImageDimensions,
  createMapping,
  deleteMapping,
}: MappingAreaProps) {
  const [areaRect, setAreaRect] = useState<DOMRect | null>(null);
  const mappingAreaRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setAreaRect(node.getBoundingClientRect());
    }
  }, [])

  const [newMapping, setNewMapping] = useState<Mapping | null>(null);
  const [anchorPoint, setAnchorPoint] =
    useState<{
      x: number;
      y: number;
    } | null>(null);

  const createNewMappingBlock = (event: React.MouseEvent) => {
    if (areaRect) {
      const { uiX, uiY } = getMouseUIXY(
        event,
        areaRect,
        originalImageDimensions
      );

      setNewMapping({
        width: 0,
        height: 0,
        ...scaleFromUIToOriginal(uiX, uiY, originalImageDimensions),
      });
      setAnchorPoint(scaleFromUIToOriginal(uiX, uiY, originalImageDimensions));
    }
  };

  useEffect(() => {
    if (newMapping && areaRect && anchorPoint) {
      const mouseMoveHandler = (event: globalThis.MouseEvent) => {
        const { uiX, uiY } = getMouseUIXY(event, areaRect, originalImageDimensions);

        const { x: mouseXInOriginal, y: mouseYInOriginal } = scaleFromUIToOriginal(
          uiX,
          uiY,
          originalImageDimensions
        );

        setNewMapping({
          x: Math.round(
            mouseXInOriginal >= anchorPoint.x ? newMapping.x : mouseXInOriginal
          ),
          y: Math.round(
            mouseYInOriginal >= anchorPoint.y ? newMapping.y : mouseYInOriginal
          ),
          width: Math.round(Math.abs(mouseXInOriginal - anchorPoint.x)),
          height: Math.round(Math.abs(mouseYInOriginal - anchorPoint.y)),
        });
      }
      document.addEventListener('mousemove', mouseMoveHandler);
      return () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
      }
    }
  }, [newMapping, areaRect, anchorPoint, setNewMapping, originalImageDimensions]);

  useEffect(() => {
    if (newMapping) {
      const mouseUpHander = () => {
        createMapping(newMapping);
        setNewMapping(null);
      }
      document.addEventListener('mouseup', mouseUpHander);
      return () => {
        document.removeEventListener('mouseup', mouseUpHander);
      }
    }
  }, [newMapping, createMapping, setNewMapping])

  return (
    <div
      className="mapping-area"
      ref={mappingAreaRef}
      onMouseDown={createNewMappingBlock}
    >
      <img
        draggable={false}
        className="mapping-area"
        src={image}
        alt="you uploaded this"
      />
      {originalImageDimensions &&
        mappings.map((mapping, index) => (
          <MappingBlock
            onDelete={() => {
              deleteMapping(index);
            }}
            mapping={mapping}
            index={index}
            originalImageDimensions={originalImageDimensions}
            key={JSON.stringify(mapping)}
          />
        ))}
      {originalImageDimensions && newMapping && (
        <MappingBlock
          mapping={newMapping}
          index={mappings.size}
          originalImageDimensions={originalImageDimensions}
        />
      )}
    </div>
  );
}
