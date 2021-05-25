import delete_icon from './../../../assets/delete.svg';
import { coordinateType } from './../Interface'

export default function CropFrame(props: {setCoordinates:any, coordinates:(coordinateType)[], index:number}) {
  const delCrop = () => {
    const removeItem = (items:(coordinateType)[], i:number) =>
      items.slice(0, i-1).concat(items.slice(i, items.length))
    props.setCoordinates(removeItem(props.coordinates, props.index+1))
  }
  const cropStyle = {
    left: (props.coordinates[props.index].x / props.coordinates[props.index].scaleX) + 'px',
    top: (props.coordinates[props.index].y / props.coordinates[props.index].scaleY) + 'px',
    width: (props.coordinates[props.index].width / props.coordinates[props.index].scaleX) + 'px',
    height: (props.coordinates[props.index].height / props.coordinates[props.index].scaleY) + 'px'
  }
  return (
    <div
      style={cropStyle}
      className="ReactCrop__crop-selection"
    >
      <div className="crop_number">{props.index+1}</div>
      <div className="delete_btn" onClick={delCrop}>
        <div className="hover_area"></div>
        <img src={delete_icon} className="delete_icon" alt="delete_icon" />
      </div>
      <div className="ReactCrop__drag-elements">
        <div className="ReactCrop__drag-bar ord-n" data-ord="n" />
        <div className="ReactCrop__drag-bar ord-e" data-ord="e" />
        <div className="ReactCrop__drag-bar ord-s" data-ord="s" />
        <div className="ReactCrop__drag-bar ord-w" data-ord="w" />

        <div className="ReactCrop__drag-handle ord-nw" data-ord="nw" />
        <div className="ReactCrop__drag-handle ord-n" data-ord="n" />
        <div className="ReactCrop__drag-handle ord-ne" data-ord="ne" />
        <div className="ReactCrop__drag-handle ord-e" data-ord="e" />
        <div className="ReactCrop__drag-handle ord-se" data-ord="se" />
        <div className="ReactCrop__drag-handle ord-s" data-ord="s" />
        <div className="ReactCrop__drag-handle ord-sw" data-ord="sw" />
        <div className="ReactCrop__drag-handle ord-w" data-ord="w" />
      </div>
    </div>
  )
}
