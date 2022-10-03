import React, { useContext, useEffect, useRef, useState } from "react";
import ImageMapContext from "../context/ImageMapContext";
import Rect from "./Rect";

interface PreviewProps {
  imageUrl: string;
}

interface Position {
  x: number;
  y: number;
}

const Preview = ({ imageUrl }: PreviewProps) => {
  const { setImageResizeRatio, rects, addRect } = useContext(ImageMapContext);
  const [mouseDown, setmouseDown] = useState<Boolean>(false);
  const [initialPos, setInitialPos] = useState<Position>({ x: 0, y: 0 });
  const [finalPos, setFinalPos] = useState<Position>({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      if (imgRef.current) {
        setImageResizeRatio(imgRef.current.width / img.width);
        // console.log(imgRef.current.width / img.width);
      }
    };
  }, [imgRef, imageUrl, setImageResizeRatio]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (imgRef.current) {
      e.preventDefault();
      e.stopPropagation();
      setmouseDown(true);
      setInitialPos({
        x: e.clientX - imgRef.current?.x,
        y: e.clientY - imgRef.current?.y,
      });
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (imgRef.current) {
      e.preventDefault();
      e.stopPropagation();
      setFinalPos({
        x: e.clientX - imgRef.current?.x,
        y: e.clientY - imgRef.current?.y,
      });
    }
  };

  const onMoseup = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragToAddRect();
    setmouseDown(false);
  };

  const dragToAddRect = () => {
    if (mouseDown) {
      const width = Math.abs(finalPos.x - initialPos.x);
      const height = Math.abs(finalPos.y - initialPos.y);
      const x = finalPos.x < initialPos.x ? finalPos.x : initialPos.x;
      const y = finalPos.y < initialPos.y ? finalPos.y : initialPos.y;
      addRect({ x, y, width, height });
    }
  };

  return (
    <div className="preview">
      <img
        ref={imgRef}
        src={imageUrl}
        alt="UploadedImage"
        onMouseDown={onMouseDown}
        onMouseUp={onMoseup}
        onMouseMove={onMouseMove}
      />
      {rects.map((rect, index) => (
        <Rect key={rect.id} num={index} rect={rect} />
      ))}
    </div>
  );
};

export default Preview;
