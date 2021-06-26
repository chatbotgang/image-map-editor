import { createContext, useReducer, FC, Dispatch } from "react";
import localReducer, {
  initLocalState,
  IInitLocalState,
} from "./uploadLocalReducer";

const Upload = createContext<{
  state: IInitLocalState;
  dispatch: Dispatch<any>;
}>({
  state: initLocalState,
  dispatch: () => {},
});

export function WithUploadLocalCtx({ ...props }): Function {
  return (PageContainer: FC): FC => {
    const HOC: FC = () => {
      const [localState, dispatch] = useReducer(localReducer, initLocalState);
      return (
        <Upload.Provider value={{ state: localState, dispatch }}>
          <PageContainer {...props} />
        </Upload.Provider>
      );
    };
    return HOC;
  };
}
