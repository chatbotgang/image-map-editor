import React, { useEffect, useRef, useState, PointerEvent } from 'react';
import { v4 as uuidV4 } from 'uuid';

import CanvasHelper from './canvas.helper';
import { UploaderEnum, useUploader } from '../../../reducers';

import styles from '../uploader.module.css';

export const UploaderLayerCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [startPoint, setStartPoint] = useState(CanvasHelper.createOrigin());
  const [endPoint, setEndPoint] = useState(CanvasHelper.createOrigin());
  const [isDragging, setIsDragging] = useState(false);
  const { uploader, dispatch } = useUploader();
  useEffect(() => {
    const context = canvasRef.current?.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    setCtx(context);
  }, [canvasRef]);
  const drawShape = () => {
    if (!ctx) {
      return;
    }
    ctx.fillStyle = '#000fff';
    ctx.strokeStyle = '#000fff';
    const p3 = { x: endPoint.x, y: startPoint.y };
    const p4 = { x: startPoint.x, y: endPoint.y };
    const vertices = [
      startPoint,
      CanvasHelper.getCenterPoint(startPoint, p3),
      p3,
      CanvasHelper.getCenterPoint(p3, endPoint),
      endPoint,
      CanvasHelper.getCenterPoint(endPoint, p4),
      p4,
      CanvasHelper.getCenterPoint(p4, startPoint),
      startPoint,
    ];
    vertices.forEach((vertex) => {
      ctx.fillRect(vertex.x - 4, vertex.y - 4, 8, 8);
      ctx.lineTo(vertex.x, vertex.y);
    });
    ctx.stroke();
    ctx.closePath();
  };
  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    if (!ctx) {
      return;
    }
    const point = CanvasHelper.createPoint(event, ctx);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    setStartPoint(point);
    setEndPoint(point);
  };
  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging || !ctx) {
      return;
    }
    const point = CanvasHelper.createPoint(event, ctx);
    setEndPoint({
      x: CanvasHelper.getValidPosition(point.x, uploader.stageWidth as number),
      y: CanvasHelper.getValidPosition(point.y, uploader.stageHeight as number),
    });
  };
  const handlePointerUp = () => {
    const rectDimension = CanvasHelper.getDimension(startPoint, endPoint);
    if (!CanvasHelper.hasArea(rectDimension)) {
      return;
    }
    drawShape();
    setIsDragging(false);
    const rectCenter = CanvasHelper.getCenterPoint(startPoint, endPoint);
    const payload = {
      id: uuidV4(),
      ...rectCenter,
      ...rectDimension,
    };
    dispatch({ type: UploaderEnum.AddCoordinate, payload });
  };
  return (
    <canvas
      ref={canvasRef}
      className={styles.uploaderLayerCanvas}
      width={uploader.stageWidth}
      height={uploader.stageHeight}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    />
  );
};
