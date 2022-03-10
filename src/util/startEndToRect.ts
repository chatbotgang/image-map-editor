export default function startEndToRect({
  startX,
  startY,
  endX,
  endY,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  const x = Math.min(startX, endX);
  const y = Math.min(startY, endY);
  const width = Math.abs(startX - endX);
  const height = Math.abs(startY - endY);
  return {
    x,
    y,
    width,
    height,
  };
}
