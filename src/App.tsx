import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import omit from "lodash/fp/omit";
import Layout from "layouts/Layout";
import { Console, ImageMapEditor } from "components";
import type { Coordinate } from "types/coordinate";

import "react-image-crop/dist/ReactCrop.css";

function App() {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  const handleDragStop = ({
    x,
    y,
    coordinateId,
  }: {
    x: number;
    y: number;
    coordinateId: string;
  }) => {
    const updatedCoordinates = coordinates.map((coordinate) =>
      coordinate.id === coordinateId ? { ...coordinate, x, y } : coordinate
    );
    setCoordinates(updatedCoordinates);
  };

  const handleResizeStop = ({
    x,
    y,
    width,
    height,
    coordinateId,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
    coordinateId: string;
  }) => {
    const updatedCoordinates = coordinates.map((coordinate) =>
      coordinate.id === coordinateId
        ? { ...coordinate, x, y, width, height }
        : coordinate
    );
    setCoordinates(updatedCoordinates);
  };

  const handleRemoveCoordinate = (coordinateId: string) => {
    const updatedCoordinates = coordinates.filter(
      (coordinate) => coordinate.id !== coordinateId
    );
    setCoordinates(updatedCoordinates);
  };

  const handleCropComplete = ({
    x,
    y,
    width,
    height,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    if (width === 0 || height === 0) return;
    const newCoordinate = {
      id: uuidv4(),
      x: Math.round(x),
      y: Math.round(y),
      width: Math.round(width),
      height: Math.round(height),
    };
    setCoordinates(coordinates.concat(newCoordinate));
  };

  return (
    <Layout>
      <ImageMapEditor
        coordinates={coordinates}
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
        onRemoveCoordinate={handleRemoveCoordinate}
        onCropComplete={handleCropComplete}
      />
      <Console>
        {coordinates.length > 0
          ? JSON.stringify(coordinates.map(omit("id")), null, 2)
          : null}
      </Console>
    </Layout>
  );
}

export default App;
