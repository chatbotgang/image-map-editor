import "./MappingArea.css";
import { Mapping, Base64Image, ImageDimensions } from '../types';
import MappingBlock from "./MappingBlock";
import { List } from "immutable";
import { useRef, useState } from "react";

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

// function scaleFromOriginalToUI(x: number, y: number, imageDimensions: ImageDimensions) {
//   const imageDisplayHeight = getImageDisplayHeight(imageDimensions.height, imageDimensions.width, IMAGE_DISPLAY_WIDTH);
//   const uiX = x / imageDimensions.width * IMAGE_DISPLAY_WIDTH;
//   const uiY = y / imageDimensions.height * imageDisplayHeight;

//   return {
//     x: uiX,
//     y: uiY
//   }
// }

function getMouseUIXY(event: React.MouseEvent, boundingClientRect: DOMRect, originalImageDimensions: ImageDimensions) {
  const { left: areaLeft, top: areaTop } = boundingClientRect;
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  return {
    uiX: mouseX - areaLeft,
    uiY: mouseY - areaTop,
  }
}

export default function MappingArea({
  mappings,
  image,
  originalImageDimensions,
  createMapping,
  deleteMapping,
}: MappingAreaProps) {
  const mappingAreaRef = useRef<HTMLDivElement>(null);
  const [newMapping, setNewMapping] = useState<Mapping | null>(null);
  const [anchorPoint, setAnchorPoint] =
    useState<{
      x: number;
      y: number;
    } | null>(null);

  const createNewMappingBlock = (event: React.MouseEvent) => {
    if (mappingAreaRef.current) {
      const { uiX, uiY } = getMouseUIXY(
        event,
        mappingAreaRef.current.getBoundingClientRect(),
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

  const resizeNewMappingBlock = (event: React.MouseEvent) => {
    if (!newMapping || !mappingAreaRef.current || !anchorPoint) return;

    const { uiX, uiY } = getMouseUIXY(
      event,
      mappingAreaRef.current.getBoundingClientRect(),
      originalImageDimensions
    );

    const { x: mouseXInOriginal, y: mouseYInOriginal } = scaleFromUIToOriginal(
      uiX,
      uiY,
      originalImageDimensions
    );

    setNewMapping({
      x: mouseXInOriginal >= anchorPoint.x ? newMapping.x : mouseXInOriginal,
      y: mouseYInOriginal >= anchorPoint.y ? newMapping.y : mouseYInOriginal,
      width: Math.abs(mouseXInOriginal - anchorPoint.x),
      height: Math.abs(mouseYInOriginal - anchorPoint.y),
    });
  };

  const commitNewMappingBlock = (event: React.MouseEvent) => {
    if (!newMapping || !mappingAreaRef.current) return;

    createMapping(newMapping);
    setNewMapping(null);
  };

  return (
    <div
      className="mapping-area"
      ref={mappingAreaRef}
      onMouseDown={createNewMappingBlock}
      onMouseMove={resizeNewMappingBlock}
      onMouseUp={commitNewMappingBlock}
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
            key={mapping.toString()}
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
