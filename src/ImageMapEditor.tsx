import React, { useState } from "react";
import "./App.css";
import ImageUploadContainer from "./ImageUploadContainer";
import ImageDetailPreview from "./ImageDetailPreview";

const ImageMapEditor = () => {
  const [imgDetail, setImgDetail] = useState("");

  // 取得原始圖檔尺寸
  // const getImageRealSize = (imageEl: any) => {
  //   const realImg = new Image();
  //   realImg.src = imageEl.src;
  //   return { width: realImg.width, height: realImg.height };
  // };

  // 拖曳開始
  const handleDragStart = (event: any) => {
    // 拖曳圖片時，移除滑鼠的點擊移動事件，避免與拖曳範圍選取功能相互影響
    document.body.removeEventListener("mousedown", handleMouseDown);
    document.body.removeEventListener("mousemove", handleMouseMove);
    document.body.removeEventListener("mouseup", handleMouseUp);

    const previewDetail: Object = {};
    const imageElement: any = (global as any).document.getElementById(
      event.target.id
    );
    Object.assign(previewDetail, {
      x: imageElement.style.left,
      y: imageElement.style.top,
      width: imageElement.style.width,
      height: imageElement.style.height,
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

  // 處理範圍圈選功能 (點擊開始 & 點擊結束圈選)
  let start_x = 0;
  let start_y = 0;
  let end_x = 0;
  let end_y = 0;

  const handleMouseUp = (event: any) => {
    const rangeSelector = (global as any).document.getElementById("rangeSelector");

    end_x = event.clientX;
    end_y = event.clientY;
    rangeSelector.style.left = Math.min(end_x, start_x) + "px";
    rangeSelector.style.top = Math.min(end_y, start_y) + "px";
    rangeSelector.style.width = Math.abs(start_x - end_x) + "px";
    rangeSelector.style.height = Math.abs(start_y - end_y) + "px";

    // 圈選範圍為0時，不做事
    if (rangeSelector.clientWidth === 0) {
      return;
    }

    // 顯示垃圾桶按鈕
    (global as any).document.getElementById(
      "rangeSelector"
    ).children[0].style.display = "block";

    document.body.removeEventListener("mousemove", handleMouseMove);
    document.body.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: any) => {
    const rangeSelector = (global as any).document.getElementById("rangeSelector");

    rangeSelector.style.left = Math.min(event.clientX, start_x) + "px";
    rangeSelector.style.top = Math.min(event.clientY, start_y) + "px";
    rangeSelector.style.width = Math.abs(start_x - event.clientX) + "px";
    rangeSelector.style.height = Math.abs(start_y - event.clientY) + "px";
  };

  const handleMouseDown = (event: any) => {
    const rangeSelector = (global as any).document.getElementById("rangeSelector");
    rangeSelector.style.backgroundColor = null;

    // 點擊在上傳檔案的 tag 上時
    if (event.target.tagName === "INPUT") {
      return;
    }
    // 點擊在刪除的 tag 上時
    if (event.target.className === "delete-icon") {
      return;
    }

    // 有圈選出範圍且點擊在圈選範圍中時，就不再接受圈選
    if (rangeSelector.clientWidth > 0 && event.target.id === "rangeSelector") {
      return;
    }

    start_x = event.clientX;
    start_y = event.clientY;
    rangeSelector.className = "range-selector";
    rangeSelector.style.left = event.clientX + "px";
    rangeSelector.style.top = event.clientY + "px";

    // 選取開始時，使框線浮出低於圖片
    rangeSelector.style.zIndex = 1;

    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="container">
      <ImageUploadContainer
        handleDragStart={handleDragStart}
        handleMouseDown={handleMouseDown}
      />
      <ImageDetailPreview handleDragEnd={handleDragEnd} imgDetail={imgDetail} />
    </div>
  );
};

export default ImageMapEditor;
