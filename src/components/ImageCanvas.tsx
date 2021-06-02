import './ImageCanvas.css';
import React, { useState, useRef, useCallback, useEffect } from 'react';

type DrawBox = {
  color: string,
  lineWidth: number,
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  width?: number,
  height?: number,
}

interface Props {
  backgroundImage?: HTMLImageElement,
  onUpdateBox: (boxes: DrawBox[]) => void,
}

const ImageCanvas = ({
  backgroundImage,
  onUpdateBox,
}: Props) => {
  const lineOffset = 8;
  const anchrSize = 2;

  const [clickedArea, setClickedArea] = useState({ box: -1, pos: 'o' });
  const [x1, setx1] = useState(-1);
  const [x2, setx2] = useState(-1);
  const [y1, sety1] = useState(-1);
  const [y2, sety2] = useState(-1);
  const [boxes, setBoxes] = useState<DrawBox[]>([]);
  const [mousedown, setMouseDown] = useState(false);
  const [tmpBox, setTmpBox] = useState<DrawBox|null>(null);

  // let x1 = -1, x2 = -2, y1 = -1, y2 = -1;

  const canvasEl = useRef<HTMLCanvasElement>(null);
  const containerEl = useRef<HTMLDivElement>(null);

  const findCurrentArea = useCallback((x: number, y: number) => {
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      const boxXCenter = box.x1 + (box.x2 - box.x1) / 2;
      const boxYCenter = box.y1 + (box.y2 - box.y1) / 2

      if (box.x1 - lineOffset < x && x < box.x1 + lineOffset) {
        if (box.y1 - lineOffset < y && y < box.y1 + lineOffset) {
          return { box: i, pos: 'tl' };
        } else if (box.y2 - lineOffset < y && y < box.y2 + lineOffset) {
          return { box: i, pos: 'bl' };
        } else if (boxYCenter - lineOffset < y && y < boxYCenter + lineOffset) {
          return { box: i, pos: 'l' };
        }
      } else if (box.x2 - lineOffset < x && x < box.x2 + lineOffset) {
        if (box.y1 - lineOffset < y && y < box.y1 + lineOffset) {
          return { box: i, pos: 'tr' };
        } else if (box.y2 - lineOffset < y && y < box.y2 + lineOffset) {
          return { box: i, pos: 'br' };
        } else if (boxYCenter - lineOffset < y && y < boxYCenter + lineOffset) {
          return { box: i, pos: 'r' };
        }
      } else if (boxXCenter - lineOffset < x && x < boxXCenter + lineOffset) {
        if (box.y1 - lineOffset < y && y < box.y1 + lineOffset) {
          return { box: i, pos: 't' };
        } else if (box.y2 - lineOffset < y && y < box.y2 + lineOffset) {
          return { box: i, pos: 'b' };
        } else if (box.y1 - lineOffset < y && y < box.y2 + lineOffset) {
          return { box: i, pos: 'i' };
        }
      } else if (box.x1 - lineOffset < x && x < box.x2 + lineOffset) {
        if (box.y1 - lineOffset < y && y < box.y2 + lineOffset) {
          return { box: i, pos: 'i' };
        }
      }
    }
    return { box: -1, pos: 'o' };
  }, [boxes]);

  const drawIndex = useCallback((box: DrawBox, context: CanvasRenderingContext2D, index: number) => {
    context.fillStyle = 'rgba(255,255,255,0.8)';
    // context.strokeStyle = 'rgba(255,255,255,0.8)';
    context.beginPath();
    // context.lineWidth = 1;
    context.arc(box.x1 + 14, box.y1 + 14, 10, 0, 2 * Math.PI);
    context.fill();
    // context.stroke();
    context.closePath();

    context.font = '16px arial';
    context.fillStyle = 'black';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(String(index), box.x1 + 14, box.y1 + 16);

    drawDeleteIcon(box, context);
  }, []);

  const drawDeleteIcon = (box: DrawBox, context: CanvasRenderingContext2D) => {
    context.fillStyle = 'rgb(100, 100, 100)';
    context.font = '18px "Font Awesome 5 Free"';
    context.fillText('\uf2ed', box.x2 + 14, box.y1 + 12);

    // context.beginPath();
    // context.fillStyle = 'rgba(255,255,255,.8)';
    // context.fillRect(box.x2 + 4, box.y1, 26, 26);
    // context.closePath();
  }

  const drawBoxOn = useCallback((box: DrawBox, context: CanvasRenderingContext2D, index?: number) => {
    const boxXCenter = box.x1 + (box.x2 - box.x1) / 2;
    const boxYCenter = box.y1 + (box.y2 - box.y1) / 2;
    
    context.beginPath();
    context.strokeStyle = box.color;
    context.fillStyle = box.color;

    context.rect(box.x1, box.y1, (box.x2 - box.x1), (box.y2 - box.y1));
    context.lineWidth = box.lineWidth;
    context.stroke();

    context.fillRect(box.x1 - anchrSize, box.y1 - anchrSize, 2 * anchrSize, 2 * anchrSize);
    context.fillRect(box.x1 - anchrSize, boxYCenter - anchrSize, 2 * anchrSize, 2 * anchrSize);
    context.fillRect(box.x1 - anchrSize, box.y2 - anchrSize, 2 * anchrSize, 2 * anchrSize);
    context.fillRect(boxXCenter - anchrSize, box.y1 - anchrSize, 2 * anchrSize, 2 * anchrSize);
    // context.fillRect(boxXCenter - anchrSize, boxYCenter - anchrSize, 2 * anchrSize, 2 * anchrSize);
    context.fillRect(boxXCenter - anchrSize, box.y2 - anchrSize, 2 * anchrSize, 2 * anchrSize);
    context.fillRect(box.x2 - anchrSize, box.y1 - anchrSize, 2 * anchrSize, 2 * anchrSize);
    context.fillRect(box.x2 - anchrSize, boxYCenter - anchrSize, 2 * anchrSize, 2 * anchrSize);
    context.fillRect(box.x2 - anchrSize, box.y2 - anchrSize, 2 * anchrSize, 2 * anchrSize);

    context.closePath();
  }, [])

  const newBox = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    const boxX1 = x1 < x2 ? x1 : x2;
    const boxY1 = y1 < y2 ? y1 : y2;
    const boxX2 = x1 > x2 ? x1 : x2;
    const boxY2 = y1 > y2 ? y1 : y2;
    if (boxX2 - boxX1 > lineOffset * 2 && boxY2 - boxY1 > lineOffset * 2) {
      return {
        x1: boxX1,
        y1: boxY1,
        x2: boxX2,
        y2: boxY2,
        lineWidth: 1,
        color: 'rgb(52, 99, 230)'
      };
    } else {
      return null;
    }
  }, [])

  const setBackgroundImage = useCallback(() => {
    if (backgroundImage && canvasEl.current) {
      const container = containerEl.current;
      if (container) {
        const containerWidth = container.offsetWidth;
        const responsiveHeight = containerWidth * (backgroundImage.height / backgroundImage.width);
        canvasEl.current.width = containerWidth;
        canvasEl.current.height = responsiveHeight;
        // setContainerStyle({
        //   backgroundImage: `url(${backgroundImage.src})`,
        //   backgroundSize: 'contain',
        //   height: responsiveHeight,
        // });
        const context = canvasEl.current.getContext('2d');
        if (context) {
          context.drawImage(backgroundImage, 0, 0,
            containerWidth,
            responsiveHeight);
        }
      }
    }
  }, [backgroundImage]);

  const redraw = useCallback(() => {
    const context = canvasEl.current?.getContext('2d');
    const container = containerEl.current;
    if (context && container) {
      context.clearRect(0, 0, container.offsetWidth, container.offsetHeight);
      setBackgroundImage();
    }
    if (context) {
      for (let i = 0; i < boxes.length; i++) {
        drawBoxOn(boxes[i], context, i);
        drawIndex(boxes[i], context, i + 1);
      }
      if (clickedArea.box === -1) {
        const aBox = newBox(x1, y1, x2, y2);
        setTmpBox(aBox);
        if (aBox !== null) {
          drawBoxOn(aBox, context);
          drawIndex(aBox, context, boxes.length + 1);
        }
      }
    }
  }, [boxes, clickedArea, drawBoxOn, x1, x2, y1, y2, newBox, drawIndex, setBackgroundImage]);

  useEffect(() => {
    setBackgroundImage();
  }, [setBackgroundImage]);

  useEffect(() => {
    if (boxes.length > 0 && x1 === x2 && y1 === y2) { // delete
      let deleteIndex = -1;
      boxes.forEach((box, index) => {
        const delX = box.x2 + 14;
        const delY = box.y1 + 12;
        // diff less than movement threshold
        if (Math.abs(x1 - delX) < 10 && Math.abs(y1 - delY) < 10) {
          deleteIndex = index;
        }
      })
      if (deleteIndex > -1) {
        const updateBox = boxes.filter((b, i) => i !== deleteIndex);
        setBoxes(updateBox);
      }
    }
  }, [boxes, x1, x2, y1, y2]);

  useEffect(() => {
    if (mousedown) {
      redraw();
    }
  }, [mousedown, redraw]);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setMouseDown(true);
    setClickedArea(findCurrentArea(e.nativeEvent.offsetX, e.nativeEvent.offsetY));
    setx1(e.nativeEvent.offsetX);
    setx2(e.nativeEvent.offsetX);
    sety1(e.nativeEvent.offsetY);
    sety2(e.nativeEvent.offsetY);
  };

  const onMouseUp = () => {
    if (clickedArea.box === -1 && tmpBox !== null) {
      setBoxes((prevState: DrawBox[]) => [...prevState, tmpBox]);
      const context = canvasEl.current?.getContext('2d');
      if (context) {
        boxes.forEach((box, index) => {
          drawIndex(box, context, index + 1);
        })
      }
    } else if (clickedArea.box !== -1 && boxes[clickedArea.box]) { //move or resize
      const selectedBox:DrawBox = boxes[clickedArea.box];
      const { x1, x2, y1, y2 } = selectedBox;
      if (x1 && x2 && x1 > x2) {
        const preX1 = x1;
        setx1(x2);
        setx2(preX1);
      }
      if (y1 && y2 && y1 > y2) {
        const preY1 = y1;
        sety1(y2);
        sety2(preY1);
      }
    }
    if (tmpBox) {
      onUpdateBox([...boxes, tmpBox]);
    } else {
      onUpdateBox(boxes);
    }
    setClickedArea({ box: -1, pos: 'o' });
    setTmpBox(null);
    setMouseDown(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const boxId = clickedArea.box;
    if (mousedown) {
      setx2(e.nativeEvent.offsetX);
      sety2(e.nativeEvent.offsetY);
    }

    if (boxId !== -1) {
      setx1(x2);
      sety1(y2);
      const xOffset = x2 - x1;
      const yOffset = y2 - y1;
      if (clickedArea.pos === 'i' ||
        clickedArea.pos === 'tl' ||
        clickedArea.pos === 'l' ||
        clickedArea.pos === 'bl') {
        boxes[boxId].x1 += xOffset;
      }
      if (clickedArea.pos === 'i' ||
        clickedArea.pos === 'tl' ||
        clickedArea.pos === 't' ||
        clickedArea.pos === 'tr') {
        boxes[boxId].y1 += yOffset;
      }
      if (clickedArea.pos === 'i' ||
        clickedArea.pos === 'tr' ||
        clickedArea.pos === 'r' ||
        clickedArea.pos === 'br') {
        boxes[boxId].x2 += xOffset;
      }
      if (clickedArea.pos === 'i' ||
        clickedArea.pos === 'bl' ||
        clickedArea.pos === 'b' ||
        clickedArea.pos === 'br') {
        boxes[boxId].y2 += yOffset;
      }
    }
  };

  const onMouseOut = () => {
    if (clickedArea.box !== -1) {
      const selectedBox = boxes[clickedArea.box];
      let { x1, x2, y1, y2 } = selectedBox;
      if (x1 > x2) {
        const preX1 = x1;
        setx1(x2);
        setx2(preX1);
      }
      if (y1 > y2) {
        const preY1 = y1;
        sety1(y2);
        sety2(preY1);
      }
    }
    setMouseDown(false);
    setClickedArea({ box: -1, pos: 'o' });
    setTmpBox(null);
  };

  return (
    <div className="image-canvas"
      ref={containerEl}>
      <canvas
        ref={canvasEl}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
      ></canvas>
    </div>
  )
}

export default ImageCanvas;
