import {
  PointerEvent,
  useEffect,
  useReducer,
  useState,
  useCallback,
  MutableRefObject,
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
    isMoving: false,
  },
};

export interface Action {
  type: string;
  payload: ILayoutState;
}

const editorReducer: Reducer<IInitLocalState, Action> = (state, action) => {
  switch (action.type) {
    case "setStartPosition":
      console.log("action.payload", action.payload);
      return {
        ...state,
        layoutState: action.payload,
      };
    case "setEndPosition":
      return {
        ...state,
        layoutState: action.payload,
      };
    case "moveEndPosition":
      return {
        ...state,
        layoutState: {
          ...state.layoutState,
          ...action.payload,
        },
      };
    case "releaseMovingLock":
      return {
        ...state,
        layoutState: {
          ...state.layoutState,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const usePointer = (
  pointerWorkRegionRef: MutableRefObject<HTMLDivElement>
) => {
  const [isMouseDownState, setMouseDown] = useState(false);
  const [isDragState, setDrag] = useState(false);
  const [state, dispatch] = useReducer(editorReducer, initCropState);
  const handleComponentPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.cancelable) e.preventDefault();
    if (state.layoutState.isMoving) return;
    console.log("HandleComponentDown");
    const rect = pointerWorkRegionRef.current.getBoundingClientRect();
    dispatch({
      type: "setStartPosition",
      payload: {
        ...state.layoutState,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isMoving: false,
      },
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
      // move
      if (state.layoutState.isMoving) {
        console.log("moveEndPosition");
        dispatch({
          type: "moveEndPosition",
          payload: {
            ...state.layoutState,
            x: e.clientX - state.layoutState.x,
            y: e.clientY - state.layoutState.y,
          },
        });
      } else {
        dispatch({
          type: "setEndPosition",
          payload: {
            ...state.layoutState,
            width: e.clientX - state.layoutState.x,
            height: e.clientY - state.layoutState.y,
          },
        });
      }
    },
    [isMouseDownState, isDragState, state.layoutState]
  );
  const handlePointerDone = useCallback(
    (e: MouseEvent) => {
      if (isMouseDownState) {
        setMouseDown(false);
        setDrag(false);
      }
      dispatch({
        type: "releaseMovingLock",
        payload: {
          ...state.layoutState,
          isMoving: false,
        },
      });
    },
    [isMouseDownState, state.layoutState]
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
    dispatch,
  };
};
