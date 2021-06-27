import { useEffect, PointerEvent } from "react";
// const region = {
//   x: 0,
//   y: 0,
//   width: 0,
//   height: 0,
// };

export const useCrop = () => {
  const handleCropMove = (e: PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.cancelable) e.preventDefault();
    console.log("move");
  };
  useEffect(() => {}, []);
  return {
    handleCropMove,
  };
};
