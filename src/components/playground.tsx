import React, {useState} from 'react';
import Circle from './circle';
import ImageUploader from './imageUploader';
import Canvas from './canvas';
import {FileEventTarget} from '../types';


const  Playground = () => {
const [image, setImage] = useState<string>('');
const onImageUpload = function (e : FileEventTarget) {
    if(e.target.files.length > 0){
        const imgUrl: string = URL.createObjectURL(e.target.files[0]);
        setImage(imgUrl);
    }
} 
  return (
   <div className="playground">
       <div className="bg-secondary h-56">
        <Circle/>
       </div>
       <div className="flex pt-48">
       {image.length === 0 && (
            <ImageUploader onChange={(e) => onImageUpload(e)}/>  
       )}
       
       {image.length > 0 && (
            <Canvas image={image}/>    
       )}
            
       </div>
      
   </div>
  );
}

export default Playground;
