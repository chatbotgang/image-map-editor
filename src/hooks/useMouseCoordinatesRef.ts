import { MutableRefObject, useRef } from "react";

const initialRefValue = {
  downX: 0,
  downY: 0,
  upX: 0,
  upY: 0,
};

type Output = {
  mouseCoordinatesRef: MutableRefObject<{
    downX: number;
    downY: number;
    upX: number;
    upY: number;
  }>;
  clearMouseCoordinatesRef: () => void;
};

// This Hook memorizes coordinate offsets from mousedown and mouseup events
// with a clear-all utility function
const useMouseCoordinatesRef = (): Output => {
  const mouseCoordinatesRef = useRef(initialRefValue);

  const clearMouseCoordinatesRef = () => {
    mouseCoordinatesRef.current = { ...initialRefValue };
  };

  return { mouseCoordinatesRef, clearMouseCoordinatesRef };
};

export default useMouseCoordinatesRef;
