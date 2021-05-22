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

  const [mappings, setMappings] = useState<List<Mapping>>(List([]));

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

  const deleteMapping = (index: number) => {
    setMappings(mappings.remove(index));
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
        deleteMapping={deleteMapping}
      />
      <div className="data-displayer">
        <pre>{JSON.stringify(mappings, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
