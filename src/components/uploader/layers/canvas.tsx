import React, { useEffect, useRef, useState, PointerEvent } from 'react';
import { v4 as uuidV4 } from 'uuid';

import CanvasHelper from './canvas.helper';
import { UploaderEnum, useUploader } from '../../../reducers';

import styles from '../uploader.module.css';
import { Point } from '../../../types';

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
  useEffect(() => {
    if (!ctx) {
      return;
    }
    ctx.clearRect(
      0,
      0,
      uploader.stageWidth as number,
      uploader.stageHeight as number
    );
    uploader.coordinates.forEach((coordinate) => {
      drawShape(CanvasHelper.makeVerticesFromCoordinate(coordinate));
    });
  }, [uploader.coordinates]);
  const drawShape = (vertices: Point[]) => {
    if (!ctx) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    ctx.fillStyle = '#000fff';
    ctx.strokeStyle = '#000fff';
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
    setIsDragging(false);
    const rectCenter = CanvasHelper.getCenterPoint(startPoint, endPoint);
    const coordinate = {
      id: uuidV4(),
      ...rectCenter,
      ...rectDimension,
    };
    drawShape(CanvasHelper.makeVerticesFromCoordinate(coordinate));
    dispatch({ type: UploaderEnum.AddCoordinate, payload: coordinate });
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
