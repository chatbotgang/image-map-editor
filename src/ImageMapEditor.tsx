import { useState } from "react";
import "./App.css";
import ImageUploadContainer from "./ImageUploadContainer";
import ImageDetailPreview from "./ImageDetailPreview";

const ImageMapEditor = () => {
  const [previewDetail, setPreviewDetail] = useState([{}]);
  const [rangeSeletorIndex, setRangeSeletorIndex] = useState(0);

  // 取得原始圖檔尺寸
  // const getImageRealSize = (imageEl: any) => {
  //   const realImg = new Image();
  //   realImg.src = imageEl.src;
  //   return { realWidth: realImg.width, realHeight: realImg.height };
  // };

  // 處理範圍圈選功能 (點擊開始 & 點擊結束圈選)
  let start_x = 0;
  let start_y = 0;
  let end_x = 0;
  let end_y = 0;

  // 產生範圍圈選區塊
  const createRangeSelector = () => {
    const rangeSelector: any = document.createElement("div");
    const deleteBtn: any = document.createElement("div");
    const deleteIcon: any = document.createElement("div");
    rangeSelector.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteIcon);
    rangeSelector.setAttribute("id", `rangeSelector_${rangeSeletorIndex}`);
    rangeSelector.className = "range-selector";
    deleteBtn.className = "delete-btn";
    deleteIcon.className = "delete-icon";
    deleteIcon.setAttribute("id", `trash_${rangeSeletorIndex}`);
    // 刪除事件處理
    deleteIcon.onclick = function () {
      rangeSelector.style.backgroundColor = "#f5f9fa";
      rangeSelector.style.border = "initial";
      (global as any).document.getElementById(
        `rangeSelector_${rangeSeletorIndex}`
      ).children[0].style.display = "none";
    };
    document.body.appendChild(rangeSelector);
    return rangeSelector;
  };

  const handleMouseUp = (event: any) => {
    const rangeSelector = (global as any).document.getElementById(
      `rangeSelector_${rangeSeletorIndex}`
    );

    end_x = event.clientX;
    end_y = event.clientY;
    rangeSelector.style.left = Math.min(end_x, start_x) + "px";
    rangeSelector.style.top = Math.min(end_y, start_y) + "px";
    rangeSelector.style.width = Math.abs(start_x - end_x) + "px";
    rangeSelector.style.height = Math.abs(start_y - end_y) + "px";

    // 顯示垃圾桶按鈕
    (global as any).document.getElementById(
      `rangeSelector_${rangeSeletorIndex}`
    ).children[0].style.display = "block";

    setRangeSeletorIndex(rangeSeletorIndex + 1);

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
      `rangeSelector_${rangeSeletorIndex}`
    );

    rangeSelector.style.left = Math.min(event.clientX, start_x) + "px";
    rangeSelector.style.top = Math.min(event.clientY, start_y) + "px";
    rangeSelector.style.width = Math.abs(start_x - event.clientX) + "px";
    rangeSelector.style.height = Math.abs(start_y - event.clientY) + "px";
  };

  const handleMouseDown = (event: any) => {
    // 產生範圍圈選區塊
    const rangeSelector = createRangeSelector();

    start_x = event.clientX;
    start_y = event.clientY;
    rangeSelector.style.left = event.clientX + "px";
    rangeSelector.style.top = event.clientY + "px";

    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="container">
      <ImageUploadContainer handleMouseDown={handleMouseDown} />
      <ImageDetailPreview previewDetail={previewDetail} />
    </div>
  );
};

export default ImageMapEditor;
