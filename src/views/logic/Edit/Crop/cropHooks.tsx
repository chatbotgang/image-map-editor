import { useEffect, PointerEvent, useContext } from "react";
import { ImgEditorVMContext } from "../../../../presenters/Upload/uploadVM";
// const region = {
//   x: 0,
//   y: 0,
//   width: 0,
//   height: 0,
// };

export const useCrop = (crop: ILayoutState) => {
  const { dispatch, layoutState } = useContext(ImgEditorVMContext);
  const handleCropDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.cancelable) e.preventDefault();
    dispatch({
      type: "setStartPosition",
      payload: { ...layoutState, x: e.clientX, y: e.clientY, isMoving: true },
    });
    console.log("HandleCropDown");
  };
  useEffect(() => {}, []);
  return {
    handleCropDown,
  };
};
