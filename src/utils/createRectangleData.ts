type Input = {
  downX: number;
  downY: number;
  upX: number;
  upY: number;
};

type Output = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovered: boolean;
} | null;

const createRectangleData = ({ downX, downY, upX, upY }: Input): Output => {
  const originX = Math.min(downX, upX);
  const originY = Math.min(downY, upY);
  const width = Math.abs(downX - upX);
  const height = Math.abs(downY - upY);

  console.log({
    downX,
    downY,
    upX,
    upY,
    originX,
    originY,
    width,
    height,
  });

  if (!width || !height) {
    return null;
  }

  return {
    id: Date.now().toString(),
    x: originX,
    y: originY,
    width,
    height,
    isHovered: false,
  };
};

export { createRectangleData };
