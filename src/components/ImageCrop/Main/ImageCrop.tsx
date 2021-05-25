import { useState, useEffect, useRef, useCallback } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import './ImageCrop.css';
import ReactCrop from 'react-image-crop';
import ImageUploadArea from './../ImageUploadArea';
import { cropType } from './../Interface'


export default function ImageCrop(props: { children: any; setCoordinates: any; }) {
  const [upImg, setUpImg] = useState<string>('');
  const [isUploaded, upload] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<cropType>({});
  const [completedCrop, setCompletedCrop] = useState<cropType>({});

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // click upload_btn
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') setUpImg(reader.result)
      });
      reader.readAsDataURL(e.target.files[0]);
      upload(true);
    }
  };

  const onLoad = useCallback((img) => {
    // when image loaded
    imgRef.current = img;
  }, []);

  useEffect(() => {
    // when completing crop
    if (!completedCrop || !imgRef.current || !completedCrop.x || !completedCrop.y
      || !completedCrop.width || !completedCrop.height
      || completedCrop.width === 0 || completedCrop.height === 0) {
      return;
    }
    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const coordinate = {
      "x": Math.round(completedCrop.x * scaleX),
      "y": Math.round(completedCrop.y * scaleY),
      "width": Math.round(completedCrop.width * scaleX),
      "height": Math.round(completedCrop.height * scaleY),
      "scaleX": scaleX,
      "scaleY": scaleY
    }
    props.setCoordinates((preState:(number)[]) => ([...preState, coordinate]))
  }, [completedCrop]);

  return (
    <main>
      { !isUploaded && <ImageUploadArea onSelectFile={onSelectFile}/> }
      { isUploaded &&
        <div className="image_preview_area">
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(newCrop) => setCompletedCrop(newCrop)}
          />
          {props.children}
        </div>
      }
    </main>
  )
}
