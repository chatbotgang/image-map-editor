import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import SelectRectangle from './SelectRectangle';

interface rect {
  x: number;
  y: number;
  width: number;
  height: number;
  uid: number;
}

interface imageEditProps {
  givenImage: string;
  rects: rect[];
  addRect: (rect: rect) => void;
  removeRect: (rect: rect) => void;
}

function ImageEditCanvas(props: imageEditProps) {

  const [paintingRect, setPaintingRect] = useState<rect>({x: 0, y: 0, width: 0, height: 0, uid: -1})
  const [isDrawing, setIsDrawing] = useState(false)
  const [delrects, setDelrects] = useState<rect[]>([])

  const imgCanvasRef = useRef<HTMLCanvasElement>(null);

  const startPaint = useCallback((event: MouseEvent) => {
    if (!imgCanvasRef.current) {
        return;
    }
    const canvas: HTMLCanvasElement = imgCanvasRef.current;
    console.log("111", event, canvas)
    setPaintingRect({
      x: event.offsetX,
      y: event.offsetY,
      width: 0,
      height: 0,
      uid: -1
    })
    setIsDrawing(true)
  }, []);

  const exitPaint = useCallback((event: MouseEvent) => {
    if (!imgCanvasRef.current) {
        return;
    }
    if(isDrawing) {
      const canvas: HTMLCanvasElement = imgCanvasRef.current;
      let end_x = event.offsetX
      let end_y = event.offsetY
      end_x = end_x > 0 ? end_x : 0
      end_x = end_x < canvas.width ? end_x : canvas.width
      end_y = end_y > 0 ? end_y : 0
      end_y = end_y < canvas.height ? end_y : canvas.height

      props.addRect({
        x: Math.min(paintingRect.x, end_x),
        y: Math.min(paintingRect.y, end_y),
        width: Math.abs(paintingRect.x - end_x),
        height: Math.abs(paintingRect.y - end_y),
        uid: -1
      })
      setPaintingRect({x: 0, y: 0, width: 0, height: 0, uid: -1})
      setIsDrawing(false)
    }
  }, [isDrawing]);

  const paint = useCallback((event: MouseEvent) => {
    if (!imgCanvasRef.current) {
      return;
    }
    if(isDrawing) {
      const canvas: HTMLCanvasElement = imgCanvasRef.current;
      let end_x = event.offsetX
      let end_y = event.offsetY
      end_x = end_x > 0 ? end_x : 0
      end_x = end_x < canvas.width ? end_x : canvas.width
      end_y = end_y > 0 ? end_y : 0
      end_y = end_y < canvas.height ? end_y : canvas.height

      let rt = {
        x: Math.min(paintingRect.x, end_x),
        y: Math.min(paintingRect.y, end_y),
        width: Math.abs(paintingRect.x - end_x),
        height: Math.abs(paintingRect.y - end_y),
        uid: -1
      }

      setPaintingRect(rt)
    }
  }, [isDrawing]);

  useLayoutEffect(() => {
    let canvas = imgCanvasRef.current as HTMLCanvasElement;

    if(canvas !== undefined) {
      console.log(canvas)
      let ctx = canvas.getContext("2d");
      let canvas_width = canvas.width;

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
          delrects.forEach(r => {
            console.log(r)
            ctx = canvas.getContext("2d");
            if(ctx) {
              ctx.beginPath();
              ctx.rect(r.x, r.y, r.width, r.height);
              ctx.fillStyle = 'white';
              ctx.fill();
              ctx.lineWidth = 0;
              ctx.strokeStyle = "white";
              ctx.stroke();
            }
          })
        }
      }
    }
  })

  useEffect(() => {
    if (!imgCanvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = imgCanvasRef.current;
    canvas.addEventListener('mousedown', startPaint);
    return () => {
        canvas.removeEventListener('mousedown', startPaint);
    };
  }, [startPaint]);

  useEffect(() => {
    if (!imgCanvasRef.current) {
        return;
    }
    const canvas: HTMLCanvasElement = imgCanvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);
    return () => {
        canvas.removeEventListener('mouseup', exitPaint);
        canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);

  useEffect(() => {
    if (!imgCanvasRef.current) {
        return;
    }
    const canvas: HTMLCanvasElement = imgCanvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () => {
        canvas.removeEventListener('mousemove', paint);
    };
  }, [paint]);

  const removeRect = function(rect: rect) {
    const drts = [...delrects, rect]
    setDelrects(drts)
    props.removeRect(rect)
  }

  return (
    <div className="image-edit-canvas">
      <canvas ref={imgCanvasRef}
              width="355"
              key={"photo"}
              className="upload-image">
      </canvas>
      {
        props.rects.map((r, index) => 
          <SelectRectangle key={"select_rect_" + String(index)}
                           rect={r}
                           size={{width: 0, height: 0}}
                           removeRect={removeRect} />
        )
      }
      {
        isDrawing ?
          <div className="image-select-rect"
               style={{
                 top: paintingRect.y,
                 left: paintingRect.x,
                 width: paintingRect.width,
                 height: paintingRect.height}}></div> : ""
      }
    </div>
  );
}

export default ImageEditCanvas;
