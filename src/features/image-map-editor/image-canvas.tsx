import {
  useRef,
  useEffect,
  useCallback,
  MouseEvent,
} from 'react';
import { nanoid } from 'nanoid';
import { useEditor } from './editor.context';

interface ImageCanvasProps {
  onDrawStart?: () => void;
  onDrawEnd?: () => void;
}

const ImageCanvas = ({
  onDrawEnd = () => {},
  onDrawStart = () => {},
}: ImageCanvasProps) => {
  const {
    imgData,
    dispatch,
  } = useEditor();
  const isDrawingRef = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // avoid reflow frequently, only assign the value on mousedown
  const canvasRectRef = useRef<DOMRect>();

  const drawImg = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!imgData || !canvas || !context) return;
    
    context.drawImage(
      imgData.el,
      0, 0, imgData.width, imgData.height, 
      0, 0, canvas.width, canvas.height,
    );
  }, [imgData]);
  
  // init img
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgData) return;
    canvas.width = 355;
    canvas.height = 355 * (imgData.aspectRatio)
    drawImg();
  }, [imgData, drawImg]);
  
  // draw selection rectangle
  const mouseStatusRef = useRef<'idle'|'down'|'moving'>('idle');
  const rectRef = useRef({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    width: 0,
    height: 0,
  });
  const addSelection = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = rectRef.current;
    const width = Math.abs(rect.width);
    const height = Math.abs(rect.height);
    const selection = {
      id: nanoid(),
      x: rect.width > 0 ? rect.startX : rect.endX,
      y: rect.height > 0 ? rect.startY : rect.endY,
      width,
      height,
    };

    // ignore small movement
    if (width >= 5 && height >= 5) {
      dispatch({ type: 'add-selection', selection });
    }
    drawImg();
    onDrawEnd?.();
    mouseStatusRef.current = 'idle';
    isDrawingRef.current = false;
  };

  const handleMouseDown = (e: MouseEvent) => {
    mouseStatusRef.current = 'down';
    const rect = rectRef.current;
    const target = e.target as HTMLElement;
    const canvasRect = target.getBoundingClientRect();
    rect.startX = e.pageX - canvasRect.left;
    rect.startY = e.pageY - canvasRect.top;
    canvasRectRef.current = canvasRect;
  };

  const handleMouseMove = (e: MouseEvent) => {
    const mouseStatus = mouseStatusRef.current;
    const canDrawRectangle = mouseStatus === 'down'|| mouseStatus === 'moving';
    if (!canDrawRectangle) return;

    if (!isDrawingRef.current) {
      isDrawingRef.current = true;
      onDrawStart?.();
    }
    mouseStatusRef.current = 'moving';

    const rect = rectRef.current;
    const canvasRect = canvasRectRef.current;
    if (!canvasRect) return;
    rect.width = e.pageX - canvasRect.left - rect.startX;
    rect.height = e.pageY - canvasRect.top - rect.startY;
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;

    drawImg();
    // draw rectangle area
    context.lineWidth = 3;
    context.setLineDash([6]);
    context.strokeStyle = 'blue';
    context.strokeRect(rect.startX, rect.startY, rect.width, rect.height);
  };
  
  const handleMouseUp = (e: MouseEvent) => {
    if (mouseStatusRef.current === 'down') {
      mouseStatusRef.current = 'idle';
    }
    if (mouseStatusRef.current !== 'moving') return;
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;

    const rect = rectRef.current;
    const canvasRect = canvasRectRef.current;
    if (!canvasRect) return;

    rect.endX = e.pageX - canvasRect.left;
    rect.endY = e.pageY - canvasRect.top;
    addSelection();
  };

  const handleMouseLeave = (e: MouseEvent) => {    
    if (mouseStatusRef.current !== 'moving') return;
    if (!imgData || !canvasRectRef.current) return;

    const canvasRect = canvasRectRef.current;

    const rect = rectRef.current;
    let endX = e.pageX - canvasRect.left;
    let endY = e.pageY - canvasRect.top;
    let width = (e.pageX - canvasRect.left)  - rect.startX;
    let height = (e.pageY - canvasRect.top) - rect.startY;
    
    // left boundary
    if (endX < 0) endX = 0;
    // top boundary
    if (endY < 0) endY = 0;
    // right boundary
    if (endX > canvasRect.width) {
      const gap = endX - canvasRect.width;
      width = width - gap;
    }
    // bottom bondary
    if (endY > canvasRect.height) {
      const gap = endY - canvasRect.height;
      height = height - gap;
    }

    rect.endX = endX
    rect.endY = endY;
    rect.width = width;
    rect.height = height;

    addSelection();
  };

  return (
    <canvas
      style={{ cursor: 'crosshair', margin: '0 auto' }}
      ref={canvasRef}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default ImageCanvas;
