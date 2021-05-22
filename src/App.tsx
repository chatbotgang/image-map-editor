import React, { useEffect, useState } from 'react';
import { List } from "immutable";
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

  const [mappings, setMappings] = useState<List<Mapping>>(
    List([
      {
        x: 0,
        y: 0,
        width: 200,
        height: 200,
      },
    ])
  );

  const handleImageUpload = (img: Base64Image) => {
    setUploadedImage(img);
  }

  const editMapping = (index: number, value: Partial<Mapping>) => {
    const newValue = Object.assign({}, mappings.get(index), value);
    setMappings(mappings.set(index, newValue));
  };

  const createMapping = (value: Mapping) => {
    setMappings(mappings.push(value));
  };

  return (
    <div className="App">
      <ImageMapEditor
        mappings={mappings}
        uploadedImage={uploadedImage}
        onImageUpload={handleImageUpload}
        originalImageDimensions={originalImageDimensions}
        createMapping={createMapping}
        editMapping={editMapping}
      />
    </div>
  );
}

export default App;
