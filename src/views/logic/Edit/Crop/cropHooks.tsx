import {
  // useEffect,
  PointerEvent,
  useContext,
  useRef,
  MouseEvent,
  // useCallback,
} from "react";
import { ImgEditorVMContext } from "../../../../presenters/Upload/uploadVM";

export const useCrop = () => {
  const { dispatch, cropRegionRef } = useContext(ImgEditorVMContext);
  const removeBtnRef = useRef(document.createElement("button"));
  const rect = cropRegionRef.current.getBoundingClientRect();
  const handleCropDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.cancelable) e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: "setStartPosition",
      payload: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isMoving: true,
        focusIndex: e.currentTarget.id,
      },
    });
    // console.log("Event: HandleCropDown");
  };
  const handleDeleteCrop: any = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.cancelable) e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: "removeSelection",
      payload: {
        focusIndex: e.currentTarget.id,
        isDeleting: true,
      },
    });
  };

  // useEffect(() => {
  //   let refValue = removeBtnRef.current;
  //   refValue.addEventListener("onpointerdown", handleDeleteCrop);
  //   return () => {
  //     refValue.removeEventListener("onpointerdown", handleDeleteCrop);
  //   };
  // }, [removeBtnRef, handleDeleteCrop]);
  return {
    handleCropDown,
    removeBtnRef,
    handleDeleteCrop,
  };
};
