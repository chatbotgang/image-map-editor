import React, { useState } from 'react';
import './App.css';
import ImageMapEditor from './components/ImageMapEditor';

function App() {
  const [uploadedImage, setUploadedImage] = useState('');
  // const [mappings, setMappings] = useState<Mapping[]>([
  //   {
  //     x: 0,
  //     y: 0,
  //     width: 50,
  //     height: 50,
  //   }
  // ]);

  const handleImageUpload = (img: Base64Image) => {
    setUploadedImage(img);
  }

  // const editMapping = (index: number, value: Partial<Mapping>) => {
  // }

  return (
    <div className="App">
      <ImageMapEditor mappings={[]} uploadedImage={uploadedImage} onImageUpload={handleImageUpload} />
    </div>
  );
}

export default App;
