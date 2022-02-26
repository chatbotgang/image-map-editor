import React, { useState, useCallback, useEffect } from "react";
import { MouseReturn } from "./types";

export const useMouse = (): MouseReturn => {
  const ref = React.useRef<HTMLImageElement>(null);
  const [isPress, setIsPress] = useState<boolean>(false);

  const onMouseDown = useCallback(() => {
    setIsPress(true);
  }, [setIsPress]);

  const onMouseUp = useCallback(() => {
    setIsPress(false);
  }, [setIsPress]);

  useEffect(() => {
    if (ref.current) {
      ref.current.onmousedown = onMouseDown;
      ref.current.onmouseup = onMouseUp;
    }
  }, [ref, onMouseDown, onMouseUp]);

  return {
    ref,
    isPress,
  };
};
