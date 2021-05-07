import React, { useState } from 'react';
import ImageUploadBlock from './ImageUploadBlock';
import ImageEditCanvas from './ImageEditCanvas';

import './App.css';

interface rect {
  x: number;
  y: number;
  width: number;
  height: number;
  uid: number;
}

function App() {

  const [images, setImages] = useState<string[]>([])
  const [rects, setRects] = useState<rect[]>([])
  const [count, setCount] = useState(0)

  const handleUpload = function(img: string) {
    const imgs = [...images, img]
    setImages(imgs)
    //console.log(images.length)
  }

  const addRect = function(rect: rect) {
    let cnt = count + 1
    setCount(cnt)
    rect.uid = cnt
    const rts = [...rects, rect]
    setRects(rts)
  };

  const removeRect = function(rect: rect) {
    let rts = rects.filter(r => r.uid !== rect.uid)
    setRects(rts)
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
              <ImageEditCanvas key={"photo_" + String(index)} givenImage={item}
                               rects={rects}
                               addRect={addRect}
                               removeRect={removeRect} />
            ))
          }
          {
            images.length > 0 ? "" :
            <ImageUploadBlock key="upload_block" uploadNewImage={handleUpload} />
          }
        </div>
      </div>
      <div className="console-block">
        <pre>
        {
          JSON.stringify(rects.map(item => ({x: item.x, y: item.y, width: item.width, height: item.height})), null, 5)
        }
        </pre>
      </div>
    </div>
  );
}

export default App;
