import React, { useState } from "react";
import "./App.css";
import ImageUploadContainer from "./ImageUploadContainer";
import ImageDetailPreview from "./ImageDetailPreview";

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
