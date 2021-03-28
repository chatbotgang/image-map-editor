import React from "react";

interface IImageDetailPreviewProps {
  handleDragEnd: any;
  imgDetail: string;
}

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

export default ImageDetailPreview;
