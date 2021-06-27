import {
  PointerEvent,
  useEffect,
  useReducer,
  useState,
  useCallback,
  useRef,
} from "react";

interface IInitLocalState {
  layoutState: ILayoutState;
}
export const initCropState = {
  layoutState: {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  },
};

export interface Action {
  type: string;
  payload: ILayoutState;
}

const editorReducer: Reducer<IInitLocalState, Action> = (state, action) => {
  switch (action.type) {
    case "setStartPosition":
      return {
        ...state,
        layoutState: action.payload,
      };
    case "setEndPosition":
      return {
        ...state,
        layoutState: action.payload,
      };
    default:
      return state;
  }
};

export const usePointer = () => {
  const pointerWorkRegionRef = useRef(document.createElement("div"));
  const [isMouseDownState, setMouseDown] = useState(false);
  const [isDragState, setDrag] = useState(false);
  const [state, dispatch] = useReducer(editorReducer, initCropState);
  const handleComponentPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.cancelable) e.preventDefault();
    dispatch({
      type: "setStartPosition",
      payload: { ...state.layoutState, x: e.clientX, y: e.clientY },
    });
    setMouseDown(true);
  };
  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (!isMouseDownState) return;
      if (e.cancelable) e.preventDefault();
      if (!isDragState) {
        setDrag(true);
      }
      dispatch({
        type: "setEndPosition",
        payload: {
          ...state.layoutState,
          width: e.clientX - state.layoutState.x,
          height: e.clientY - state.layoutState.y,
        },
      });
    },
    [isMouseDownState, isDragState, state.layoutState]
  );
  const handlePointerDone = useCallback(
    (e: MouseEvent) => {
      if (isMouseDownState) {
        setMouseDown(false);
        setDrag(false);
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
  }, [handlePointerMove, handlePointerDone]);
  return {
    handleComponentPointerDown,
    state,
    pointerWorkRegionRef,
  };
};
