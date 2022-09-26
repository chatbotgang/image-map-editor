import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import omit from "lodash/fp/omit";
import Layout from "layouts/Layout";
import { Console, ImageMapEditor } from "components";
import type { Coordinate } from "types/coordinate";
import isCoordinatesOverlap from "utils/isCoordinatesOverlap";

import "react-image-crop/dist/ReactCrop.css";

const elementOverlayNotify = () => toast.error("The selections are overlapping.");

function App() {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  const handleDragStop = (currentCoordinate: Coordinate) => {
    if (isCoordinatesOverlap(coordinates, currentCoordinate)) {
      elementOverlayNotify();
      return;
    }
    const updatedCoordinates = coordinates.map((coordinate) =>
      coordinate.id === currentCoordinate.id ? currentCoordinate : coordinate
    );
    setCoordinates(updatedCoordinates);
  };

  const handleResizeStop = (currentCoordinate: Coordinate) => {
    if (isCoordinatesOverlap(coordinates, currentCoordinate)) {
      elementOverlayNotify();
      return;
    }
    const updatedCoordinates = coordinates.map((coordinate) =>
      coordinate.id === currentCoordinate.id ? currentCoordinate : coordinate
    );
    setCoordinates(updatedCoordinates);
  };

  const handleCropComplete = ({
    x,
    y,
    width,
    height,
  }: Omit<Coordinate, "id">) => {
    if (width === 0 || height === 0) return;

    const newCoordinate = {
      id: uuidv4(),
      x: Math.round(x),
      y: Math.round(y),
      width: Math.round(width),
      height: Math.round(height),
    };

    if (isCoordinatesOverlap(coordinates, newCoordinate)) {
      elementOverlayNotify();
      return;
    }

    setCoordinates(coordinates.concat(newCoordinate));
  };

  const handleRemoveCoordinate = ({ id }: Coordinate) => {
    const updatedCoordinates = coordinates.filter(
      (coordinate) => coordinate.id !== id
    );
    setCoordinates(updatedCoordinates);
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
      <Toaster />
    </Layout>
  );
}

export default App;
