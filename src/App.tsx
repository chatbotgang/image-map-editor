import React from 'react';
import ImageUploadBlock from './ImageUploadBlock';
import './App.css';

function App() {

  const [images, setImages] = React.useState<string[]>([])

  const handleUpload = function(img: string) {
    const imgs = [...images, img]
    setImages(imgs)
    console.log(images.length)
  }

  return (
    <div className="App">
      <div className="image-block">
        <div className="image-header">
          <div className="image-header-circle">
          </div>
        </div>
        <div className="image-body">
          {
            images.map((item, index) => (
              <img src={item} key={"photo_" + String(index)} className="upload-image" />
            ))
          }
          <ImageUploadBlock uploadNewImage={handleUpload} />
        </div>
      </div>
      <div className="console-block">
      </div>
    </div>
  );
}

export default App;
