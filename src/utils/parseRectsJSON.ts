import { Rectangle } from "../types";

const parseRectsJSON = (rects: Rectangle[]): string => {
  // perform deep copy via JSON methods
  // delete unwanted object properties
  const copiedRects = JSON.parse(JSON.stringify(rects)).map(
    (rect: Rectangle) => {
      delete rect.id;
      delete rect.isHovered;
      return rect;
    }
  );

  console.log({ copiedRects });

  const JSONizedRects = JSON.stringify(copiedRects);
  const displayText = JSONizedRects.replaceAll(",", ",\n    ")
    .replaceAll("{", "{\n    ")
    .replaceAll("}", "\n  }")
    .replaceAll(",\n    {", ",\n  {")
    .replaceAll("[", "[\n  ")
    .replaceAll("]", "\n]")
    .replaceAll('"', "");

  console.log(`${displayText}`);

  return `${displayText}`;
};

export { parseRectsJSON };
