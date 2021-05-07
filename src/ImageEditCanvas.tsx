import React, { useRef, useEffect, useLayoutEffect } from 'react';
import './ImageUploadBlock.css';

interface imageEditProps {
  givenImage: string;
}

function ImageEditCanvas(props: imageEditProps) {

  const imgCanvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    let canvas = imgCanvasRef.current as HTMLCanvasElement;

    if(canvas !== undefined) {
      let ctx = canvas.getContext("2d");
      let canvas_width = canvas.width;
      let canvas_height = canvas.height;

      let img = new Image();
      img.src = props.givenImage;
      img.onload = function() {

        /* Scale to Fit */
        let scale = canvas_width / img.width;
        // get the top left position of the image
        let x = (canvas_width / 2) - (img.width / 2) * scale;
        let y = 0;
        canvas.height = img.height * scale;
        /* ************ */

        if(ctx) {
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
      }
    }
  })

  return (
    <div className="image-edit-canvas">
      <canvas ref={imgCanvasRef} key={"photo"} className="upload-image">
      </canvas>
    </div>
  );
}

export default ImageEditCanvas;
