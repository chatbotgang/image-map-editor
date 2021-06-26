import { PointerEvent, useEffect, useReducer, useCallback } from "react";
interface IInitLocalState {
  isMouseDownState: boolean;
}
const initState = {
  isMouseDownState: false,
};

export interface Action {
  type: string;
}

const editorReducer: Reducer<IInitLocalState, Action> = (
  state: any,
  action: any
) => {
  switch (action.type) {
    case "mouseDown":
      return {
        ...state,
        isMouseDownState: true,
      };
    case "mouseUp":
      return {
        ...state,
        isMouseDownState: false,
      };
  }
};

export const useEditor = () => {
  const [{ isMouseDownState }, dispatch] = useReducer(editorReducer, initState);
  const handleComponentPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.cancelable) e.preventDefault();
    console.log("pointer down");
    console.log(e.clientX);
    console.log(e.clientY);
    dispatch({ type: "mouseDown" });
  };
  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (!isMouseDownState) {
        return;
      }
      if (e.cancelable) e.preventDefault();
      console.log("isMouseDownState", isMouseDownState);
    },
    [isMouseDownState]
  );
  const handlePointerDone = useCallback(
    (e: MouseEvent) => {
      console.log("pointer up");
      console.log(e.clientX);
      console.log(e.clientY);
      if (isMouseDownState) {
        dispatch({ type: "mouseUp" });
      }
    },
    [isMouseDownState]
  );
  useEffect(() => {
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerDone);
    document.addEventListener("pointercancel", handlePointerDone);
    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerDone);
      document.removeEventListener("pointercancel", handlePointerDone);
    };
  }, [isMouseDownState, handlePointerMove, handlePointerDone]);
  return {
    handleComponentPointerDown,
  };
};
