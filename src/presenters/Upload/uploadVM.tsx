import { createContext, useReducer, FC, Dispatch, PointerEvent } from "react";
import localReducer, {
  initLocalState,
  IInitLocalState,
} from "./uploadLocalReducer";
import { usePointer, initCropState } from "../../views/logic/Pointer/hooks";

export const ImgEditorVMContext = createContext<{
  state: IInitLocalState;
  layoutState: ILayoutState;
  handleComponentPointerDown: (e: PointerEvent<HTMLDivElement>) => void;
  dispatch: Dispatch<any>;
}>({
  state: initLocalState,
  layoutState: initCropState.layoutState,
  handleComponentPointerDown: (e: PointerEvent<HTMLDivElement>) => {},
  dispatch: () => {},
});

export function WithUploadLocalCtx({ ...props }): Function {
  return (PageContainer: FC): FC => {
    const HOC: FC = () => {
      const [localState, dispatch] = useReducer(localReducer, initLocalState);
      const { state, handleComponentPointerDown } = usePointer();
      console.log("state in VM", state);
      return (
        <ImgEditorVMContext.Provider
          value={{
            state: localState,
            dispatch,
            layoutState: state.layoutState,
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
