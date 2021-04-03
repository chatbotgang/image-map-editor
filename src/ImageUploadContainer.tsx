import React from "react";
import Header from "./Header";
import ImageUploader from "./ImageUploader";

interface IImageUploadContainerProps {
  handleMouseDown: React.MouseEventHandler<HTMLElement>;
}

const ImageUploadContainer: React.FC<IImageUploadContainerProps> = (
  props: IImageUploadContainerProps
): JSX.Element => {
  return (
    <div className="image-upload-container">
      <Header />
      <ImageUploader handleMouseDown={(e) => props.handleMouseDown(e)} />
    </div>
  );
};

export default ImageUploadContainer;
