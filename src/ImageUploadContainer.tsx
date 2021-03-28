import React from "react";
import Header from "./Header";
import ImageUploader from "./ImageUploader";

interface IImageUploadContainerProps {
  handleDragStart: React.MouseEventHandler<HTMLElement>;
}

const ImageUploadContainer: React.FC<IImageUploadContainerProps> = (
  props: IImageUploadContainerProps
): JSX.Element => (
  <div className="image-upload-container">
    <Header />
    <ImageUploader handleDragStart={props.handleDragStart} />
  </div>
);

export default ImageUploadContainer;
