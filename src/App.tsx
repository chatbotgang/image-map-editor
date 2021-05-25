import { useState } from 'react';
import PhoneScreen from './components/UI/PhoneScreen/PhoneScreen';
import GeekScreen from './components/UI/GeekScreen/GeekScreen';
import ImageCrop from './components/ImageCrop/Main/ImageCrop';
import MultiCropFrames from './components/ImageCrop/MultiCropFrames/MultiCropFrames'
import { JsonArrayIndent } from './components/Global/JsonIndent'
import { coordinateType } from './components/ImageCrop/Interface'
import './App.css'

export default function App() {
  const [coordinates, setCoordinates] = useState<(coordinateType)[]>([]);
  return (
    <div className="multi_crops_page">
      <PhoneScreen>
        <ImageCrop setCoordinates={setCoordinates}>
          <MultiCropFrames setCoordinates={setCoordinates} coordinates={coordinates} />
        </ImageCrop>
      </PhoneScreen>
      <GeekScreen>
        <JsonArrayIndent jsonArray={coordinates}/>
      </GeekScreen>
    </div>
  );
}
