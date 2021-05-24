// src/components/Navbar.tsx

import { useState, useEffect, useRef, useCallback } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import './PreviewPhone.css';
import image_icon from './../assets/image.png';
import delete_icon from './../assets/delete.svg';
import ReactCrop from 'react-image-crop';


function CropSelection(props:any) {
  const delCrop = () => {
    props.delCrop(props.index)
  }
  return (
    <div
      style={props.cropStyle} // temp
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

// type cropType = {
//   unit: string,
//   width: number,
//   aspect: number
// }

export default function PreviewPhone() {
  const [upImg, setUpImg] = useState<any>();
  const [isUploaded, upload] = useState<boolean>(false);
  const [coordinates, setCoordinate] = useState<any>([]);
  const [cropStyles, setCropStyle] = useState<any>([]);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<any>({});
  const [completedCrop, setCompletedCrop] = useState<any>(null);

  const delCrop = (index:number) => {
    const removeItem = (items:any, i:number) =>
      items.slice(0, i-1).concat(items.slice(i, items.length))
    setCoordinate(removeItem(coordinates, index+1))
    setCropStyle(removeItem(cropStyles, index+1))
  }

  const onSelectFile = (e:any) => {
    // click upload_btn
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      upload(true);
    }
  };

  const onLoad = useCallback((img) => {
    // when image loaded
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !imgRef.current) {
      return;
    }
    // when image load and complete crop
    const image = imgRef.current;
    const crop = completedCrop;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    // console.log(completedCrop)

    if (crop.width !== 0 && crop.height !== 0) {
      const coordinate = {
        "x": Math.round(crop.x * scaleX),
        "y": Math.round(crop.y * scaleY),
        "width": Math.round(crop.width * scaleX),
        "height": Math.round(crop.height * scaleX)
      }
      setCoordinate([...coordinates, coordinate])

      const cropStyle = {
        top: crop.y + 'px',
        left: crop.x + 'px',
        width: crop.width + 'px',
        height: crop.height + 'px'
      }
      setCropStyle([...cropStyles, cropStyle])
    }
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
        onChange={(newCrop) => setCrop(newCrop)}
        onComplete={(newCrop) => setCompletedCrop(newCrop)}
      />
      <div className="multiple_crops">
        {
          cropStyles.map((cropStyle:any, index:number) =>
            <CropSelection key={index} cropStyle={cropStyle} index={index} delCrop={delCrop}/>
          )
        }
      </div>
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
          {JSON.stringify(coordinates, null, '\t')}

        </div>
      </div>
    </div>
  )
}
