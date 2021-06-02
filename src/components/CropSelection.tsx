import { useCallback } from 'react';

import './CropSelection.css';

interface Props {
  style?: any,
  index: number,
  onDelete?: any
}

const CropSelection = ({
  style,
  index,
  onDelete,
}: Props) => {
  const selectionStyle = {
    left: style.x,
    top: style.y,
    width: style.width,
    height: style.height
  }

  const handleDelete = useCallback(() => {
    onDelete(index);
  }, [index, onDelete]);

  return (
    <div className="ReactCrop__crop-selection" style={selectionStyle}>
      <div className="ReactCrop__selection-addon">
        <div className="addon-wrap">
          <span className="index">{index + 1}</span>
          <i className="ico-del far fa-trash-alt" onClick={handleDelete}></i>
        </div>
      </div>
      <div className="ReactCrop__drag-elements">
        <div className="ReactCrop__drag-bar ord-n" data-ord="n"></div>
        <div className="ReactCrop__drag-bar ord-e" data-ord="e"></div>
        <div className="ReactCrop__drag-bar ord-s" data-ord="s"></div>
        <div className="ReactCrop__drag-bar ord-w" data-ord="w"></div>
        <div className="ReactCrop__drag-handle ord-nw" data-ord="nw"></div>
        <div className="ReactCrop__drag-handle ord-n" data-ord="n"></div>
        <div className="ReactCrop__drag-handle ord-ne" data-ord="ne"></div>
        <div className="ReactCrop__drag-handle ord-e" data-ord="e"></div>
        <div className="ReactCrop__drag-handle ord-se" data-ord="se"></div>
        <div className="ReactCrop__drag-handle ord-s" data-ord="s"></div>
        <div className="ReactCrop__drag-handle ord-sw" data-ord="sw"></div>
        <div className="ReactCrop__drag-handle ord-w" data-ord="w"></div>
      </div>
    </div>
  )
}

export default CropSelection;
