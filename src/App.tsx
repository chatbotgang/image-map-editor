import { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Rnd } from "react-rnd";
import ReactCrop, { Crop } from "react-image-crop";
import { AiOutlinePicture, AiOutlineDelete } from "react-icons/ai";
import omit from "lodash/fp/omit";

import "react-image-crop/dist/ReactCrop.css";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  gap: 135px;
  flex-wrap: wrap;
`;

const ImageMapEditor = styled.div`
  width: 433px;
  height: 792px;
  border-radius: 4px;
  background-color: #f5f9fa;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const ImageMapEditorHeader = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  background-color: #ebf0f3;
`;

const ImageMapEditorHeaderCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #d4dadf;
`;

const ImageMapEditorBody = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: center;
`;

const ImageMapEditorInput = styled.input`
  opacity: 0;
  width: 355px;
  height: 156px;
  cursor: pointer;
  position: absolute;
`;

const ImageMapEditorInputPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  color: #a3a4a7;
`;

const ImageMapEditorUploader = styled.div`
  width: 355px;
  height: 156px;
  border: 2px solid #d7dadd;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;
`;

const Image = styled.img`
  width: 355px;
  height: auto;
  border: 4px solid #6683b8;
  border-radius: 10px;
`;

const ImageMapEditorNumberTag = styled.div`
  color: #000000;
  background-color: #eeeeee;
  font-weight: 500;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageMapEditorUploaderDeleteButton = styled.button`
  position: absolute;
  right: -40px;
  top: 0px;
  padding: 2px;
  color: #a3a4a7;
  background-color: #ffffff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Console = styled.div`
  width: 548px;
  height: 703px;
  padding: 20px;
  overflow: auto;
  border-radius: 4px;
  color: #ffffff;
  background-color: #2a3949;
  font-family: monospace;
  white-space: pre;
`;

const style = {
  display: "flex",
  padding: 5,
  border: "solid 1px #1070e0",
  background: "transparent",
};

interface Coordinate {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

function App() {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [crop, setCrop] = useState<Crop>();
  const [imageSrc, setImageSrc] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImageSrc((reader?.result as string) ?? "")
      );
      reader.readAsDataURL(event.target.files[0]);
    }
  };

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
      <ImageMapEditor>
        <ImageMapEditorHeader>
          <ImageMapEditorHeaderCircle />
        </ImageMapEditorHeader>
        <ImageMapEditorBody>
          <div>
            {imageSrc ? (
              <>
                <ReactCrop
                  className="crop-image"
                  crop={crop}
                  onChange={(crop) => setCrop(crop)}
                  onDragEnd={() => setCrop(undefined)}
                  onComplete={handleCropComplete}
                >
                  <Image alt="image source" src={imageSrc} />
                </ReactCrop>
                {coordinates.map((coordinate, index) => (
                  <Rnd
                    key={coordinate.id}
                    bounds=".crop-image"
                    style={style}
                    size={{
                      width: coordinate.width,
                      height: coordinate.height,
                    }}
                    position={{ x: coordinate.x, y: coordinate.y }}
                    onDragStop={(_, d) =>
                      handleDragStop({
                        x: d.x,
                        y: d.y,
                        coordinateId: coordinate.id,
                      })
                    }
                    onResizeStop={(e, _, ref, delta, position) =>
                      handleResizeStop({
                        x: position.x,
                        y: position.y,
                        width: ref.offsetWidth,
                        height: ref.offsetHeight,
                        coordinateId: coordinate.id,
                      })
                    }
                    resizeHandleStyles={{
                      bottom: {
                        backgroundColor: "#1070e0",
                        width: 8,
                        height: 8,
                        bottom: -4,
                        left: "50%",
                        transform: "translate(-50%, 0)",
                      },
                      bottomLeft: {
                        backgroundColor: "#1070e0",
                        width: 8,
                        height: 8,
                        left: -4,
                        bottom: -4,
                      },
                      bottomRight: {
                        backgroundColor: "#1070e0",
                        width: 8,
                        height: 8,
                        right: -4,
                        bottom: -4,
                      },
                      left: {
                        backgroundColor: "#1070e0",
                        width: 8,
                        height: 8,
                        left: -4,
                        top: "50%",
                        transform: "translate(0, -50%)",
                      },
                      right: {
                        backgroundColor: "#1070e0",
                        width: 8,
                        height: 8,
                        right: -4,
                        top: "50%",
                        transform: "translate(0, -50%)",
                      },
                      top: {
                        backgroundColor: "#1070e0",
                        width: 8,
                        height: 8,
                        top: -4,
                        left: "50%",
                        transform: "translate(-50%, 0)",
                      },
                      topLeft: {
                        backgroundColor: "#1070e0",
                        width: 8,
                        height: 8,
                        left: -4,
                        top: -4,
                      },
                      topRight: {
                        backgroundColor: "#1070e0",
                        width: 8,
                        height: 8,
                        right: -4,
                        top: -4,
                      },
                    }}
                  >
                    <ImageMapEditorNumberTag>
                      {index + 1}
                    </ImageMapEditorNumberTag>
                    <ImageMapEditorUploaderDeleteButton
                      onClick={() => handleRemoveCoordinate(coordinate.id)}
                    >
                      <AiOutlineDelete size={24} />
                    </ImageMapEditorUploaderDeleteButton>
                  </Rnd>
                ))}
              </>
            ) : (
              <ImageMapEditorUploader>
                <ImageMapEditorInput
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                />
                <ImageMapEditorInputPlaceholder>
                  <AiOutlinePicture size={24} />
                  <label htmlFor="file">Upload image</label>
                </ImageMapEditorInputPlaceholder>
              </ImageMapEditorUploader>
            )}
          </div>
        </ImageMapEditorBody>
      </ImageMapEditor>
      <Console>
        {coordinates.length > 0
          ? JSON.stringify(coordinates.map(omit("id")), null, 2)
          : null}
      </Console>
    </Layout>
  );
}

export default App;
