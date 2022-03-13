import React, {FunctionComponent} from 'react';
import { FileEventTarget } from '../types';

interface props {
    onChange:  (e: FileEventTarget) => void;
}


const  ImageUploader: FunctionComponent<props> = ({onChange }) => {
  return (
    
   <input type="file" accept="image/*" onChange={onChange}/>
  );
}

export default ImageUploader;