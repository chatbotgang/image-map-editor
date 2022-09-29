import { nanoid } from 'nanoid';
import {
  useRef,
  useEffect,
  useCallback,
  MouseEvent,
} from 'react';
import { useEditor } from './editor.context';
import { detectIsOverlap } from './utils';

export type DrawStartCallback = () => void;
export type DrawStopCallback = () => void;
interface ImageCanvasProps {
  width: number;
  height: number;
  onDrawStart?: DrawStartCallback;
  onDrawStop?: DrawStopCallback;
}

const ImageCanvas = ({
  width,
  height,
  onDrawStart,
  onDrawStop,
}: ImageCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRectRef = useRef<DOMRect>();

  const editorContext = useEditor();
  const imgData = editorContext.imgData!;
  const selections = editorContext.selections;
  const dispatch = editorContext.dispatch;

  const drawImg = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context) return;
    
    context.drawImage(
      imgData.el,
      0, 0, imgData.width, imgData.height, 
      0, 0, width, height,
    );
  }, [imgData, width, height]);
  
  // init img
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawImg();
  }, [drawImg]);
  
  // draw selection rectangle
  const isDrawingRef = useRef(false);
  const mouseStatusRef = useRef<'idle'|'down'|'moving'>('idle');
  const rectRef = useRef({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    width: 0,
    height: 0,
  });
  const addSelectionIfNeeded = () => {
    const rect = rectRef.current;
    const newSelection = {
      id: nanoid(),
      x: rect.width > 0 ? rect.startX : rect.endX,
      y: rect.height > 0 ? rect.startY : rect.endY,
      width: Math.abs(rect.width),
      height: Math.abs(rect.height),
    };

    // detect overlap
    const isOverlap = selections.some((selection) => {
      return detectIsOverlap(newSelection, selection);
    });
    if (isOverlap) return;
    
    const isLessThanMinimumSize = (
      newSelection.width < 1
      || newSelection.height < 1
    );
    if (isLessThanMinimumSize) return;
    
    dispatch({
      type: 'add-selection',
      selection: newSelection,
    });
  };
  const stopDrawing = () => {
    mouseStatusRef.current = 'idle';
    isDrawingRef.current = false;
    drawImg();
    onDrawStop?.();
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
      mouseStatusRef.current = 'moving';
      isDrawingRef.current = true;
      onDrawStart?.();
    }

    const rect = rectRef.current;
    const canvasRect = canvasRectRef.current!;
    rect.width = e.pageX - canvasRect.left - rect.startX;
    rect.height = e.pageY - canvasRect.top - rect.startY;
    const context = canvasRef.current!.getContext('2d');
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
    const canvasRect = canvasRectRef.current!;

    rect.endX = e.pageX - canvasRect.left;
    rect.endY = e.pageY - canvasRect.top;
    addSelectionIfNeeded();
    stopDrawing();
  };

  const handleMouseLeave = (e: MouseEvent) => {    
    if (mouseStatusRef.current !== 'moving') return;
    if (!canvasRectRef.current) return;

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
    addSelectionIfNeeded();
    stopDrawing();
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      data-image-canvas=""
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default ImageCanvas;
