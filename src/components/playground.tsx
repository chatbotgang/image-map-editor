import React from 'react';
import Circle from './circle';
import ImageUploader from './imageUploader';
import Canvas from './canvas';
import useUploadFile from '../hooks/useUploadFile';


const  Playground = () => {
    const {image, setImage} = useUploadFile();
 
  return (
   <div className="playground">
       <div className="bg-secondary h-56">
        <Circle/>
       </div>
       <div className="flex pt-48">
       {image.length === 0 && (
            <ImageUploader onChange={(e) => setImage(e)}/>  
       )}
       
       {image.length > 0 && (
            <Canvas image={image}/>    
       )}
            
       </div>
      
   </div>
  );
}

export default Playground;
