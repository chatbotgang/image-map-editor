import { useState } from "react";
import "./App.css";
import ImageUploadContainer from "./ImageUploadContainer";
import ImageDetailPreview from "./ImageDetailPreview";

const ImageMapEditor = () => {
  const [previewDetail, setPreviewDetail] = useState([{}]);

  // 取得原始圖檔尺寸
  // const getImageRealSize = (imageEl: any) => {
  //   const realImg = new Image();
  //   realImg.src = imageEl.src;
  //   return { width: realImg.width, height: realImg.height };
  // };

  // 處理範圍圈選功能 (點擊開始 & 點擊結束圈選)
  let start_x = 0;
  let start_y = 0;
  let end_x = 0;
  let end_y = 0;

  const handleMouseUp = (event: any) => {
    const rangeSelector = (global as any).document.getElementById(
      "rangeSelector"
    );

    end_x = event.clientX;
    end_y = event.clientY;
    rangeSelector.style.left = Math.min(end_x, start_x) + "px";
    rangeSelector.style.top = Math.min(end_y, start_y) + "px";
    rangeSelector.style.width = Math.abs(start_x - end_x) + "px";
    rangeSelector.style.height = Math.abs(start_y - end_y) + "px";

    // 顯示垃圾桶按鈕
    (global as any).document.getElementById(
      "rangeSelector"
    ).children[0].style.display = "block";

    // 於 preview 區塊顯示圈選範圍的資訊
    Object.keys(previewDetail[0]).length > 0
      ? setPreviewDetail([
          ...previewDetail,
          {
            x: rangeSelector.style.left,
            y: rangeSelector.style.top,
            width: rangeSelector.style.width,
            height: rangeSelector.style.height,
          },
        ])
      : setPreviewDetail([
          {
            x: rangeSelector.style.left,
            y: rangeSelector.style.top,
            width: rangeSelector.style.width,
            height: rangeSelector.style.height,
          },
        ]);

    document.body.removeEventListener("mousemove", handleMouseMove);
    document.body.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: any) => {
    const rangeSelector = (global as any).document.getElementById(
      "rangeSelector"
    );

    rangeSelector.style.left = Math.min(event.clientX, start_x) + "px";
    rangeSelector.style.top = Math.min(event.clientY, start_y) + "px";
    rangeSelector.style.width = Math.abs(start_x - event.clientX) + "px";
    rangeSelector.style.height = Math.abs(start_y - event.clientY) + "px";
  };

  const handleMouseDown = (event: any) => {
    const rangeSelector = (global as any).document.getElementById(
      "rangeSelector"
    );

    // 圈選範圍初始化
    (global as any).document.getElementById(
      "rangeSelector"
    ).children[0].style.display = "none";
    rangeSelector.style.backgroundColor = null;
    rangeSelector.style.width = 0;
    rangeSelector.style.height = 0;

    // 點擊在上傳檔案的 tag 上時
    if (event.target.tagName === "INPUT") {
      return;
    }
    // 點擊在刪除的 tag 上時
    if (event.target.className === "delete-icon") {
      return;
    }

    start_x = event.clientX;
    start_y = event.clientY;
    rangeSelector.className = "range-selector";
    rangeSelector.style.left = event.clientX + "px";
    rangeSelector.style.top = event.clientY + "px";

    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="container">
      <ImageUploadContainer
        handleMouseDown={handleMouseDown}
      />
      <ImageDetailPreview previewDetail={previewDetail} />
    </div>
  );
};

export default ImageMapEditor;
