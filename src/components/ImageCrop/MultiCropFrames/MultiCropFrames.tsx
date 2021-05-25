import CropFrame from './CropFrame';
import { coordinateType } from './../Interface'

export default function MultiCropFrames(props: { setCoordinates: any; coordinates: (coordinateType)[]; }) {
  return (
    <div className="multiple_crops"> {
        props.coordinates.map((coordinate:any, index:number) =>
        <CropFrame key={index} setCoordinates={props.setCoordinates} coordinates={props.coordinates} index={index}/>
      )}
    </div>
  )
}
