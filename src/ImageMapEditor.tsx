import React, { useState, useRef } from "react";
import "./App.css";

interface IImpageUploaderProps {
  handleDragStart: React.MouseEventHandler<HTMLElement>;
}
interface IImageUploadContainerProps {
  handleDragStart: React.MouseEventHandler<HTMLElement>;
}
interface IImageDetailPreviewProps {
  handleDragEnd: any;
  imgDetail: string;
}

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
            draggable="true"
            onDragStart={(e) => props.handleDragStart(e)}
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
    <ImpageUploader handleDragStart={props.handleDragStart} />
  </div>
);

// 右側圖片資訊預覽區塊
const ImageDetailPreview: React.FC<IImageDetailPreviewProps> = (
  props: IImageDetailPreviewProps
): JSX.Element => {
  // 防止預設行為
  const cancelDefault = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  return (
    <div
      data-role="drag-drop-container"
      className="image-preview-container"
      onDrop={props.handleDragEnd}
      onDragEnter={(e) => cancelDefault(e)}
      onDragOver={(e) => cancelDefault(e)}
    >
      <pre style={{ color: "white", margin: "20px" }}>{props.imgDetail}</pre>
    </div>
  );
};

const ImageMapEditor = () => {
  const [imgDetail, setImgDetail] = useState("");

  // 取得原始圖檔尺寸
  const getImageRealSize = (imageEl: any) => {
    const realImg = new Image();
    realImg.src = imageEl.src;
    return { width: realImg.width, height: realImg.height };
  };

  // 拖曳開始
  const handleDragStart = (event: any) => {
    const previewDetail: Object = {};
    const imageElement: any = (global as any).document.getElementById(
      event.target.id
    );
    Object.assign(previewDetail, getImageRealSize(imageElement), {
      x: "x座標",
      y: "y座標",
    });
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify(previewDetail, null, 2)
    );
  };

  // 拖曳結束
  const handleDragEnd = (event: any) => {
    setImgDetail(event.dataTransfer.getData("text/plain"));
  };

  return (
    <div className="container">
      <ImageUploadContainer handleDragStart={handleDragStart} />
      <ImageDetailPreview handleDragEnd={handleDragEnd} imgDetail={imgDetail} />
    </div>
  );
};

export default ImageMapEditor;
