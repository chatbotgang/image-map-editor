import React, { useEffect, useState } from 'react';
import './App.css';
import ImageMapEditor from './components/ImageMapEditor';
import { Mapping, Base64Image, ImageDimensions } from './types';

function App() {
  const [uploadedImage, setUploadedImage] = useState('');
  const [originalImageDimensions, setOriginalImageDimensions] = useState<ImageDimensions | undefined>();

  useEffect(() => {
    const tempImg = new Image();

    tempImg.onload = function() {
      setOriginalImageDimensions({
        width: tempImg.width,
        height: tempImg.height
      })
    }

    tempImg.src = uploadedImage;
  }, [uploadedImage]);

  const [mappings, setMappings] = useState<Mapping[]>([
    {
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    },
  ]);

  const handleImageUpload = (img: Base64Image) => {
    setUploadedImage(img);
  }

  const editMapping = (index: number, value: Partial<Mapping>) => {};

  return (
    <div className="App">
      <ImageMapEditor
        mappings={mappings}
        uploadedImage={uploadedImage}
        onImageUpload={handleImageUpload}
        originalImageDimensions={originalImageDimensions}
      />
    </div>
  );
}

export default App;
