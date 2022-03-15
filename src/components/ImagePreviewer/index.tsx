import cx from 'classnames';
import Compressor from 'compressorjs';
import { FC, useState, MouseEventHandler, useCallback } from 'react';

import * as Type from 'type';
import * as Comp from "components";

import style from './style.module.css';

const toBase64 = async (file: File | Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onerror = error => reject(error);
  reader.onload = () => resolve(reader.result);
});

interface Props {
  rectangleList: Type.Rectangle[];
  deleteRectangle: (index: number) => void;
  appendRectangleList: {(rectangleList: Type.Rectangle): void};
}

const getOffsetPosition = (currentTarget: HTMLDivElement) => {
  const {x: offsetX, y: offsetY} = currentTarget.getBoundingClientRect();
  return {offsetX, offsetY}
}

export const ImagePreviewer: FC<Props> = ({ rectangleList, appendRectangleList, deleteRectangle }) => {
  const [preview, setPreview] = useState<string>();
  const [scope, setScope] = useState<Type.Scope | null>();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    new Compressor(file, {maxWidth: 355, success: async (result) => {
      setPreview(await toBase64(result) as string);
    }});
  };

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    if(scope) return;
    const {offsetX, offsetY} = getOffsetPosition(e.currentTarget);
    setScope({
      x: e.clientX - offsetX,
      y: e.clientY - offsetY,
      x2: e.clientX - offsetX,
      y2: e.clientY - offsetY,
    })
  }

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if(!scope) return;
    let {x, y} = scope;
    const {offsetX, offsetY} = getOffsetPosition(e.currentTarget);
    let x2 = e.clientX - offsetX;
    let y2 = e.clientY - offsetY;
    setScope({ x, y, x2, y2 });
  }

  const getRectangleAttr = ((scope: Type.Scope) => {
    let {x, y, x2, y2} = scope;
    if(x2 < x) [x, x2] = [x2, x];
    if(y2 < y) [y, y2] = [y2, y];
    const width = x2 - x;
    const height = y2 - y;
    return { left: x, top: y, width, height }
  });

  const handleMouseUp = useCallback(() => {
    setScope(null);
    if(!scope || (scope.x === scope.x2 && scope.y === scope.y2)) return {};
    const { left, top, width, height} = getRectangleAttr(scope);
    appendRectangleList({left, top, width, height});
  }, [appendRectangleList, scope]);

  if(!preview) return (
    <label className={style.ImagePreviewer}>
      <input type="file" onChange={handleUpload} accept="image/*" />
      <svg width="24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#bbbdbf" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Upload image
    </label>
  );

  return (
    <div className={cx(style.ImagePreviewer, style.preview)}>
      <img src={preview} alt="the preview" className={style.preview} />
      {rectangleList.map((rectangle, index) =>
        <Comp.Rectangle key={index} serialNum={index+1} onDelete={deleteRectangle.bind(null, index)} disabledTrash={scope} {...rectangle} />
      )}
      <div className={style.Map}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}>
        {scope && (
          <Comp.Rectangle {...getRectangleAttr(scope)} disabledTrash={true} />
        )}
      </div>
    </div>
  );
};
