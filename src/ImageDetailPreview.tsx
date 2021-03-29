import React from "react";

interface IImageDetailPreviewProps {
  // handleDragEnd: React.MouseEventHandler<HTMLElement>;
  previewDetail: Object[];
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
      className="image-preview-container"
    >
      <pre style={{ color: "white", margin: "20px" }}>
        {Object.keys(props.previewDetail[0]).length > 0 &&
          JSON.stringify(props.previewDetail, null, 4)}
      </pre>
    </div>
  );
};

export default ImageDetailPreview;
