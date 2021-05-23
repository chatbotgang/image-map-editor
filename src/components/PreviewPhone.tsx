// src/components/Navbar.tsx

import * as React from 'react';
import './PreviewPhone.css';
import image_icon from './../assets/image.png';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// type cropType = {
//   unit: string,
//   width: number,
//   aspect: number
// }

export default function PreviewPhone() {
  const [upImg, setUpImg] = React.useState<any>();
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [crop, setCrop] = React.useState<any>({});
  const [completedCrop, setCompletedCrop] = React.useState<any>(null);

  const onSelectFile = (e:any) => {
    // click upload_btn
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = React.useCallback((img) => {
    imgRef.current = img;
  }, []);

  React.useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;


    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;


    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    if (ctx) {
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }
  }, [completedCrop]);


  return (
    <div className="phone_screen">
      <div className="navbar">
        <div className="user_avatar"></div>
      </div>
      <div>
        <div className="upload_area">
          <div className="upload_message">
            <img src={image_icon} className="image_icon" alt="image_icon" /><br />
            Upload Image
            <input className="upload_btn" type="file" accept="image/*" onChange={onSelectFile} />
          </div>
        </div>
        <div className="image_preview_area">
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            />
        </div>
      </div>
      <div>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0)
          }}
        />
      </div>
    </div>
  )
}
