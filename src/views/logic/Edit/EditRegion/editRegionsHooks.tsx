import {
  PointerEvent,
  useEffect,
  useContext,
  useState,
  useCallback,
  MutableRefObject,
} from "react";
import { ImgEditorVMContext } from "../../../../presenters/Upload/uploadVM";

export const useFrame = (cropRegionRef: MutableRefObject<HTMLDivElement>) => {
  const [ret, setRet] = useState({});
  useEffect(() => {
    if (cropRegionRef.current) {
      setRet(cropRegionRef.current.getBoundingClientRect());
    }
    return () => {};
  }, [cropRegionRef]);
  return ret;
};

export const usePointer = (rect: DOMRect) => {
  const {
    state: { cropSelectionDict, focusIndex },
    dispatch,
  } = useContext(ImgEditorVMContext);
  const [isMouseDownState, setMouseDown] = useState(false);

  const handleComponentPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.cancelable) e.preventDefault();

    if (focusIndex) return;
    dispatch({
      type: "setStartPosition",
      payload: {
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
      // move
      if (focusIndex) {
        // console.log("Event: moveEndPosition");
        dispatch({
          type: "moveEndPosition",
          payload: {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          },
        });
      } else {
        // console.log("Event: setEndPosition");
        dispatch({
          type: "setEndPosition",
          payload: {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          },
        });
      }
    },
    [isMouseDownState, rect, focusIndex, dispatch]
  );
  const handlePointerDone = useCallback(
    (e: MouseEvent) => {
      if (!isMouseDownState) return;
      if (isMouseDownState) {
        setMouseDown(false);
      }
      // console.log("Event: handlePointerDone");
      dispatch({
        type: "releaseMovingLock",
        payload: {
          isMoving: false,
          focusIndex: null,
        },
      });
    },
    [isMouseDownState, dispatch]
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
    cropSelectionDict,
    dispatch,
  };
};
