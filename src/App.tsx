import { useState } from 'react';
import './App.css';

import ImageUpload from './components/ImageUpload';
// import ImageCrop from './components/ImageCrop';
// import CropSelection from './components/CropSelection';
import ImageCanvas from './components/ImageCanvas';

import CropData from './components/CropData';

import { Cropper } from './interfaces/ImageCrop';

function App() {
  const [imgSrc, setImgSrc] = useState<HTMLImageElement|null>();
  const [crops, setCrops] = useState<Cropper[]>([]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // const reader = new FileReader();
      // reader.addEventListener('load', () => {
      //   if (typeof reader.result === 'string') {
      //     setImgSrc(reader.result);
      //   }
      // });
      // reader.readAsDataURL(file);
      const imageInst = new Image();
      imageInst.src = URL.createObjectURL(file);
      imageInst.addEventListener('load', () => {
        setImgSrc(imageInst);
      })
      // setImgSrc(URL.createObjectURL(file));
    }
  };

  // const setCompletedCrop = (crop: Cropper) => {
  //   setCrops((prevState: any) => {
  //     return [...prevState, crop];
  //   });
  // }

  // const onDelete = (i: number) => {
  //   if (crops.length === 0) return;
  //   setCrops(crops.filter((item, index) => i !== index));
  // }

  const onUpdateBox = (boxes: any[]) => {
    const boxData = boxes.map((item, index) => {
      const { x1, x2, y1, y2 } = item;
      return {
        x: x1,
        y: y1,
        width: Math.abs(x1 - x2),
        height: Math.abs(y1 - y2),
      }
    });
    setCrops(boxData);
  }

  return (
    <div className="app">
      <section className="image-edit">
        <div className="bar">
          <span className="circle"></span>
        </div>
        <div className="draw">
          {!imgSrc && <ImageUpload onSelectFile={onSelectFile} />}
          {/* {!!imgSrc && <ImageCrop imgSrc={imgSrc.src}
            setCompletedCrop={setCompletedCrop}
          >
            <div className="ReactCrop crop-demo">
              {crops && crops.map((c: Cropper, index: number) => {
                return (
                  <CropSelection key={index} style={c} index={index} onDelete={onDelete(index)} />
                )
              })}
            </div>
          </ImageCrop>} */}
          {imgSrc && <ImageCanvas backgroundImage={imgSrc} onUpdateBox={onUpdateBox} />}
        </div>
      </section>
      <section className="image-data">
        <code>
          <CropData coordinates={crops}></CropData>
        </code>
      </section>
    </div>
  );
}

export default App;
