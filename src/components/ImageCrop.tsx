import { useState, useRef, useCallback } from 'react';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import './ImageCrop.css';

import { Cropper } from '../interfaces/ImageCrop';

interface Props {
  children?: any,
  setCompletedCrop: (item: Cropper) => void,
  imgSrc: string,
}

const ImageCrop = ({
  children,
  setCompletedCrop,
  imgSrc,
}: Props) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Cropper>({} as Cropper);
  // const [completedCrop, setCompletedCrop] = useState<Cropper>({} as Cropper);

  // const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.addEventListener('load', async () => {
  //       if (typeof reader.result === 'string') {
  //         setUpImg(reader.result);
  //       }
  //     });
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const onImageLoaded = useCallback((image) => {
    imgRef.current = image;
  }, []);

  const completed = (completedCrop: any) => {
    if (!completedCrop || !imgRef.current ||
      !completedCrop.width || !completedCrop.height) {
      return;
    }
    setCompletedCrop(completedCrop);
    // setKeepSelect(true);
  };

  // const addonComponent = (state: any, index: number) => {
  //   function onDeleteClick(e: any) {
  //     console.log('handleDel =>', e);
  //     onDeleted(index);
  //   }
  //   return (
  //     <div className="addon-wrap">
  //       <span className="index">{index + 1}</span>
  //       <i className="ico-del far fa-trash-alt" onClick={onDeleteClick}></i>
  //     </div>  
  //   );
  // }

  return (
    <div className="image-crop">
      {children}
      <ReactCrop
        src={imgSrc}
        onImageLoaded={onImageLoaded}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => completed(c)}
      >
      </ReactCrop>
    </div>
  )
}

export default ImageCrop;
