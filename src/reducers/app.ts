import { createContext, Dispatch, useContext } from 'react';

import { UploaderAction, UploaderState, uploaderReducer } from './uploader';

export type AppState = {
  uploader: UploaderState;
};

export type AppAction = UploaderAction;

export type AppCtx = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};

export const appState: AppState = {
  uploader: {
    stageWidth: 0,
    stageHeight: 0,
    ratio: 1,
    coordinates: [],
  },
};

export const appReducer = (
  initialState: AppState,
  action: AppAction
): AppState => ({
  uploader: uploaderReducer(initialState.uploader, action as UploaderAction),
});

export const AppContext = createContext<AppCtx>({
  state: appState,
  dispatch: () => null,
});

export const useUploader = () => {
  const { state, dispatch } = useContext(AppContext);
  return { uploader: state.uploader, dispatch };
};
