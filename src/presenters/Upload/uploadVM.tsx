import { createContext, FC, Dispatch, PointerEvent, useRef } from "react";
import { usePointer, initCropState } from "../../views/logic/Pointer/hooks";

export const ImgEditorVMContext = createContext<{
  // state: IInitLocalState;
  layoutState: ILayoutState;
  handleComponentPointerDown: (e: PointerEvent<HTMLDivElement>) => void;
  dispatch: Dispatch<any>;
  pointerWorkRegionRef: any;
}>({
  // state: initLocalState,
  layoutState: initCropState.layoutState,
  handleComponentPointerDown: (e: PointerEvent<HTMLDivElement>) => {},
  pointerWorkRegionRef: null,
  dispatch: () => {},
});

export function WithUploadLocalCtx({ ...props }): Function {
  return (PageContainer: FC): FC => {
    const HOC: FC = () => {
      const pointerWorkRegionRef = useRef(document.createElement("div"));
      // const [localState, dispatch] = useReducer(localReducer, initLocalState);
      const { state, handleComponentPointerDown, dispatch } =
        usePointer(pointerWorkRegionRef);
      return (
        <ImgEditorVMContext.Provider
          value={{
            // state: localState,
            dispatch,
            layoutState: state.layoutState,
            pointerWorkRegionRef: pointerWorkRegionRef,
            handleComponentPointerDown: handleComponentPointerDown,
          }}
        >
          <PageContainer {...props} />
        </ImgEditorVMContext.Provider>
      );
    };
    return HOC;
  };
}
