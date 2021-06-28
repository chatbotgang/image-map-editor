import { createContext, FC, Dispatch, useRef, useReducer } from "react";
import {
  editorReducer,
  initCropState,
  IInitLocalState,
} from "./uploadLocalReducer";

export const ImgEditorVMContext = createContext<{
  state: IInitLocalState;
  dispatch: Dispatch<any>;
  cropRegionRef: any;
  cropRef: any;
}>({
  state: initCropState,
  dispatch: () => {},
  cropRegionRef: null,
  cropRef: null,
});

export function WithUploadLocalCtx({ ...props }): Function {
  return (PageContainer: FC): FC => {
    const HOC: FC = () => {
      const cropRegionRef = useRef(document.createElement("div"));
      const cropRef = useRef(document.createElement("div"));
      const [state, dispatch] = useReducer(editorReducer, initCropState);
      return (
        <ImgEditorVMContext.Provider
          value={{
            dispatch,
            state: state,
            cropRegionRef: cropRegionRef,
            cropRef: cropRef,
          }}
        >
          <PageContainer {...props} />
        </ImgEditorVMContext.Provider>
      );
    };
    return HOC;
  };
}
