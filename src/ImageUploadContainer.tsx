import React from "react";
import Header from "./Header";
import ImageUploader from "./ImageUploader";

interface IImageUploadContainerProps {
  handleMouseDown: React.MouseEventHandler<HTMLElement>;
}

const ImageUploadContainer: React.FC<IImageUploadContainerProps> = (
  props: IImageUploadContainerProps
): JSX.Element => {
  const handleDelete = (event: any) => {
    const rangeSelector = (global as any).document.getElementById("rangeSelector");
    rangeSelector.style.backgroundColor = '#f5f9fa';
  };

  return (
    <div
      className="image-upload-container"
    >
      <Header />
      <ImageUploader handleMouseDown={(e) => props.handleMouseDown(e)} />
      <div
        id="rangeSelector"
      >
        <div className="delete-btn" onClick={(e) => handleDelete(e)}>
          <div className="delete-icon"  />
        </div>
      </div>
    </div>
  );
};

export default ImageUploadContainer;
