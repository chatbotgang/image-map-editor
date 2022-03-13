import React, {useState} from 'react';
import {FileEventTarget} from '../types';

interface TReturn {
    image: string,
    setImage: (e:FileEventTarget)=> void
}

const useUploadFile = (): TReturn => {
    const [image, setImage] = useState<string>('');
const onImageUpload =  (e : FileEventTarget) => {
    if(e.target.files.length > 0){
        const imgUrl: string = URL.createObjectURL(e.target.files[0]);
        setImage(imgUrl);
    }
} 
  return {
    image,
    setImage: onImageUpload
  };
};

export default useUploadFile;
