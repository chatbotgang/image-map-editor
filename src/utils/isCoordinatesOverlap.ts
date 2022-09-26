import type { Coordinate } from "types/coordinate";

interface DOMRect {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const isElementsOverlap = (domRect1: DOMRect, domRect2: DOMRect) => {
  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
};

const coordinateToDOMRect = (coordinate: Omit<Coordinate, "id">) => ({
  top: coordinate.y,
  left: coordinate.x,
  right: coordinate.x + coordinate.width,
  bottom: coordinate.y + coordinate.height,
});

const isCoordinatesOverlap = (
  coordinates: Coordinate[],
  targetCoordinate: Coordinate
) => {
  if (coordinates.length < 1) return false;
  return coordinates
    .filter((coordinate) => coordinate.id !== targetCoordinate.id)
    .some((currentCoordinate) =>
      isElementsOverlap(
        coordinateToDOMRect(currentCoordinate),
        coordinateToDOMRect(targetCoordinate)
      )
    );
};

export default isCoordinatesOverlap;
