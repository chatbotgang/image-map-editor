/**
 * @remarks
 * This utility function uses `String.replaceAll()`, which works only on Node.js 15 or above
 */

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

  // transform the object into a JSON string for further processing
  const JSONizedString = JSON.stringify(copiedRects);

  // add line breaks and spaces
  const displayText = JSONizedString.replaceAll(",", ",\n    ")
    .replaceAll("{", "{\n    ")
    .replaceAll("}", "\n  }")
    .replaceAll(",\n    {", ",\n  {") // modify string overcorrection
    .replaceAll("[", "[\n  ")
    .replaceAll("]", "\n]")
    .replaceAll('"', "");

  return `${displayText}`;
};

export { parseRectsJSON };