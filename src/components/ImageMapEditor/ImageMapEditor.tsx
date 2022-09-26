import { useState } from "react";
import { Rnd } from "react-rnd";
import ReactCrop from "react-image-crop";
import type { Crop } from "react-image-crop";
import { AiOutlinePicture, AiOutlineDelete } from "react-icons/ai";
import type { Coordinate } from "types/coordinate";
import {
  ImageMapEditorContainer,
  ImageMapEditorHeader,
  ImageMapEditorHeaderCircle,
  ImageMapEditorBody,
  ImageMapEditorInput,
  ImageMapEditorInputPlaceholder,
  ImageMapEditorUploader,
  ImageMapEditorImagePreview,
  ImageMapEditorNumberTag,
  ImageMapEditorUploaderDeleteButton,
} from "./ImageMapEditor.style";

import "react-image-crop/dist/ReactCrop.css";

const CROP_BASE_COLOR = "#1070e0";
const CROP_RESIZE_BASE_SIZE = 8;

const rndBaseStyle = {
  display: "flex",
  padding: 5,
  border: `solid 1px ${CROP_BASE_COLOR}`,
  background: "transparent",
};

const RESIZE_HANDLE_BASE_STYLE = {
  backgroundColor: CROP_BASE_COLOR,
  width: CROP_RESIZE_BASE_SIZE,
  height: CROP_RESIZE_BASE_SIZE,
};
const RESIZE_HANDLE_POSITION_OFFSET = -(CROP_RESIZE_BASE_SIZE / 2);

const RESIZE_HANDLE_STYLES = {
  bottom: {
    ...RESIZE_HANDLE_BASE_STYLE,
    bottom: RESIZE_HANDLE_POSITION_OFFSET,
    left: "50%",
    transform: "translate(-50%, 0)",
  },
  bottomLeft: {
    ...RESIZE_HANDLE_BASE_STYLE,
    left: RESIZE_HANDLE_POSITION_OFFSET,
    bottom: RESIZE_HANDLE_POSITION_OFFSET,
  },
  bottomRight: {
    ...RESIZE_HANDLE_BASE_STYLE,
    right: RESIZE_HANDLE_POSITION_OFFSET,
    bottom: RESIZE_HANDLE_POSITION_OFFSET,
  },
  left: {
    ...RESIZE_HANDLE_BASE_STYLE,
    left: RESIZE_HANDLE_POSITION_OFFSET,
    top: "50%",
    transform: "translate(0, -50%)",
  },
  right: {
    ...RESIZE_HANDLE_BASE_STYLE,
    right: RESIZE_HANDLE_POSITION_OFFSET,
    top: "50%",
    transform: "translate(0, -50%)",
  },
  top: {
    ...RESIZE_HANDLE_BASE_STYLE,
    top: RESIZE_HANDLE_POSITION_OFFSET,
    left: "50%",
    transform: "translate(-50%, 0)",
  },
  topLeft: {
    ...RESIZE_HANDLE_BASE_STYLE,
    left: RESIZE_HANDLE_POSITION_OFFSET,
    top: RESIZE_HANDLE_POSITION_OFFSET,
  },
  topRight: {
    ...RESIZE_HANDLE_BASE_STYLE,
    right: RESIZE_HANDLE_POSITION_OFFSET,
    top: RESIZE_HANDLE_POSITION_OFFSET,
  },
};

interface ImageMapEditorProps {
  coordinates: Coordinate[];
  onDragStop: (coordinate: Coordinate) => void;
  onResizeStop: (coordinate: Coordinate) => void;
  onRemoveCoordinate: (coordinate: Coordinate) => void;
  onCropComplete: (coordinate: Omit<Coordinate, "id">) => void;
}

const ImageMapEditor = ({
  coordinates,
  onDragStop,
  onResizeStop,
  onRemoveCoordinate,
  onCropComplete,
}: ImageMapEditorProps) => {
  const [crop, setCrop] = useState<Crop>();
  const [imageSrc, setImageSrc] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImageSrc((reader?.result as string) ?? "")
      );
      const file = event.target.files[0];
      if (file.type.includes("image")) {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <ImageMapEditorContainer>
      <ImageMapEditorHeader>
        <ImageMapEditorHeaderCircle />
      </ImageMapEditorHeader>
      <ImageMapEditorBody>
        <div>
          {imageSrc ? (
            <>
              <ReactCrop
                style={{ maxHeight: 662 }}
                className="crop-image"
                crop={crop}
                onChange={(crop) => setCrop(crop)}
                onDragEnd={() => setCrop(undefined)}
                onComplete={onCropComplete}
              >
                <ImageMapEditorImagePreview
                  alt="crop image preview"
                  draggable={false}
                  src={imageSrc}
                />
              </ReactCrop>
              {coordinates.map((coordinate, index) => (
                <Rnd
                  key={coordinate.id}
                  bounds=".crop-image"
                  style={rndBaseStyle}
                  size={{
                    width: coordinate.width,
                    height: coordinate.height,
                  }}
                  position={{ x: coordinate.x, y: coordinate.y }}
                  onDragStop={(_, DraggableData) =>
                    onDragStop({
                      ...coordinate,
                      x: DraggableData.x,
                      y: DraggableData.y,
                      id: coordinate.id,
                    })
                  }
                  onResizeStop={(e, _, ref, delta, position) => {
                    onResizeStop({
                      x: position.x,
                      y: position.y,
                      width: ref.offsetWidth,
                      height: ref.offsetHeight,
                      id: coordinate.id,
                    });
                  }}
                  resizeHandleStyles={RESIZE_HANDLE_STYLES}
                >
                  <ImageMapEditorNumberTag>{index + 1}</ImageMapEditorNumberTag>
                  <ImageMapEditorUploaderDeleteButton
                    onClick={() => onRemoveCoordinate(coordinate)}
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
    </ImageMapEditorContainer>
  );
};

export default ImageMapEditor;
