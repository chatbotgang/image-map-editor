// src/components/Navbar.tsx

import * as React from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import './PreviewPhone.css';
import image_icon from './../assets/image.png';
import ReactCrop from 'react-image-crop';

// type cropType = {
//   unit: string,
//   width: number,
//   aspect: number
// }

export default function PreviewPhone() {
  const [upImg, setUpImg] = React.useState<any>();
  const [isUploaded, upload] = React.useState<boolean>(false);
  const [coordinate, setCoordinate] = React.useState<any>({});
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = React.useState<any>({});
  const [completedCrop, setCompletedCrop] = React.useState<any>(null);

  const onSelectFile = (e:any) => {
    // click upload_btn
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      upload(true);
    }
  };

  const onLoad = React.useCallback((img) => {
    imgRef.current = img;
  }, []);

  React.useEffect(() => {
    if (!completedCrop || !imgRef.current) {
      return;
    }
    const image = imgRef.current;
    const crop = completedCrop;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const result = {
      "x": Math.round(crop.x * scaleX),
      "y": Math.round(crop.y * scaleY),
      "width": Math.round(crop.width * scaleX),
      "height": Math.round(crop.height * scaleX)
    }
    setCoordinate(result)
  }, [completedCrop]);

var ImageUploadArea =
<div className="upload_area">
  <div className="upload_message">
    <img src={image_icon} className="image_icon" alt="image_icon" /><br />
    Upload Image
    <input className="upload_btn" type="file" accept="image/*" onChange={onSelectFile} />
  </div>
</div>
var ImagePreviewArea = <noscript />

if (isUploaded) {
  ImageUploadArea = <noscript />
  ImagePreviewArea =
  <div className="image_preview_area">
    <ReactCrop
      src={upImg}
      onImageLoaded={onLoad}
      crop={crop}
      onChange={(c) => setCrop(c)}
      onComplete={(c) => setCompletedCrop(c)}
      />
  </div>
}


  return (
    <div>
      <div className="phone_screen">
        <div className="navbar">
          <div className="user_avatar"></div>
        </div>
        <div>
          {ImageUploadArea}
          {ImagePreviewArea}
        </div>
      </div>
      <div className="coordinate_preview">
        <div className="container">
          {JSON.stringify(coordinate)}
        </div>
      </div>
    </div>
  )
}
