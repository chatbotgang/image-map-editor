import { createContext, Dispatch } from "react";

export type Block = {
  id?: number;
  index?: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface AppState {
  imageSrc: string | null,
  blocks: Block[],
};

export interface AppContext {
  dispatch: Dispatch<AppAction>,
  state: AppState,
};

export enum ActionEnum {
  SET_IMAGE_SRC = 'SET_IMAGE_SRC',
  ADD_BLOCK = 'ADD_BLOCK',
  DELETE_BLOCK = 'DELETE_BLOCK',
}

export type AppAction = {
  type: ActionEnum;
  payload: any;
}

export const appState: AppState = {
  imageSrc: null,
  blocks: [],
};

export const appContext = createContext<AppContext>({ state: appState, dispatch: () => null });

export const appReducer = (state: AppState, action: AppAction): AppState => {
  const { type, payload } = action;
  switch (type) {
    case ActionEnum.SET_IMAGE_SRC:
      return {
        ...state,
        imageSrc: payload,
      };
    case ActionEnum.ADD_BLOCK:
      return {
        ...state,
        blocks: [...state.blocks, payload],
      };
    case ActionEnum.DELETE_BLOCK:
      return {
        ...state,
        blocks: state.blocks.filter(block => block.id !== payload.id),
      };
    default:
      return state;
  }
};
