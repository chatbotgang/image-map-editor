import { PointerEvent } from 'react';

import { Dimension, Point } from '../../../types';

const CanvasHelper = {
  createOrigin: (): Point => ({ x: 0, y: 0 }),
  createPoint: (
    event: PointerEvent<HTMLCanvasElement>,
    ctx: CanvasRenderingContext2D
  ): Point => {
    const bbox = ctx.canvas.getBoundingClientRect();
    ctx.canvas.setPointerCapture(event.pointerId);
    const x = event.clientX - bbox.left;
    const y = event.clientY - bbox.top;
    return { x, y };
  },
  getValidPosition: (position: number, max: number): number => {
    if (position > max) {
      return max;
    } else if (position < 0) {
      return 0;
    }
    return position;
  },
  getCenterPoint: (p1: Point, p2: Point): Point => ({
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  }),
  getDimension: (p1: Point, p2: Point): Dimension => ({
    width: Math.abs(p1.x - p2.x),
    height: Math.abs(p1.y - p2.y),
  }),
  hasArea: (d: Dimension) => d.width * d.height > 0,
};

export default CanvasHelper;
