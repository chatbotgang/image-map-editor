import React, { useState, useRef } from "react";
import "./App.css";

interface IImpageUploaderProps {}
interface IImageUploadContainerProps {}
interface IImageDetailPreviewProps {}

const Header: React.FC<any> = (): JSX.Element => (
  <div className="header">
    <div className="close-icon" />
  </div>
);

// 圖片上傳元件
const ImpageUploader: React.FC<IImpageUploaderProps> = (
  props: IImpageUploaderProps
): JSX.Element => {
  const [imageFile, setFileChanged] = useState("");

  const handleFileChanged = (event: any) => {
    const files: any = event.target.files[0];
    if (!files || files.length === 0) return;
    // 設定預覽圖片
    setFileChanged(URL.createObjectURL(files));
  };

  return (
    <>
      {!imageFile ? (
        <div className="image-upload-section">
          <div className="container">
            <div className="img" />
            <span>Upload Image</span>
          </div>
          <input
            className="image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChanged(e)}
          />
        </div>
      ) : (
        <div className="image-preview-section">
          <img
            id="uploadImage"
            src={imageFile || ""}
            style={{ cursor: "grab" }}
          />
        </div>
      )}
    </>
  );
};

// 左側上傳圖片區塊
const ImageUploadContainer: React.FC<IImageUploadContainerProps> = (
  props: IImageUploadContainerProps
): JSX.Element => (
  <div className="image-upload-container">
    <Header />
    <ImpageUploader />
  </div>
);

// 右側圖片資訊預覽區塊
const ImageDetailPreview: React.FC<IImageDetailPreviewProps> = (
  props: IImageDetailPreviewProps
): JSX.Element => {

  return (
    <div
      data-role="drag-drop-container"
      className="image-preview-container"
    ></div>
  );
};

const ImageMapEditor = () => {
  const [imgDetail, setImgDetail] = useState("");
  return (
    <div className="container">
      <ImageUploadContainer />
      <ImageDetailPreview />
    </div>
  );
};

export default ImageMapEditor;
