import React from 'react';
import './SelectRectangle.css';

interface rect {
  x: number;
  y: number;
  width: number;
  height: number;
  uid: number;
}

interface canvasSize {
  width: number;
  height: number;
}

interface rectProps {
  rect: rect;
  size: canvasSize;
  removeRect: (rect: rect) => void;
}

function SelectRectangle(props: rectProps) {

  return (
    <div className="image-select-rect"
         style={{
           top: props.rect.y,
           left: props.rect.x,
           width: props.rect.width,
           height: props.rect.height}}>
      <button onClick={() => {props.removeRect(props.rect)}}>
        <img className="icon" src="delete.svg" alt="icon of upload" />
      </button>
    </div>
  );
}

export default SelectRectangle;
