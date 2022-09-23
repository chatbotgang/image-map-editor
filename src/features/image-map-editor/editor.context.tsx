import {
  useContext,
  useReducer,
  createContext,
  ReactNode,
} from 'react';

// state
export interface Selection {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImgData {
  el: HTMLImageElement;
  width: number;
  height: number;
  aspectRatio: number;
}

interface EditorState {
  imgData: ImgData|null;
  selections: Selection[];
}

// reducer
type Action =
  | { type: 'add-image'; imgData: ImgData }
  | { type: 'delete-image'; }
  | { type: 'add-selection'; selection: Selection }
  | { type: 'delete-selection'; id: string }
  | { type: 'update-selection'; id: string; selection: Selection }
type Dispatch = (action: Action) => void;

const initialStates: EditorState = {
  imgData: null,
  selections: [],
};

function editorReducer(state: EditorState, action: Action) {
  switch(action.type) {
    case 'add-image': {
      return {
        ...state,
        imgData: action.imgData,
      };
    }

    case 'delete-image': {
      return { ...initialStates };
    }

    case 'add-selection': {
      const newSelections = state.selections.concat(action.selection);
      return { 
        ...state, 
        selections: newSelections,
      };
    }
      
    case 'update-selection': {
      const index = state.selections.findIndex(({ id }) => id === action.id);
      if (index === -1) return state;

      return {
        ...state,
        selections: [
          ...state.selections.slice(0, index),
          action.selection,
          ...state.selections.slice(index + 1),
        ],
      };
    }
      
    case 'delete-selection': {
      const newSelections = state.selections.filter(({ id }) => id !== action.id);

      return {
        ...state,
        selections: newSelections,
      };
    }
    default: return state;
  }
};

// context
interface EditorContextType {
  imgData: ImgData|null;
  selections: Selection[];
  dispatch: Dispatch;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);
EditorContext.displayName = 'EditorContext';

export const EditorProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(editorReducer, { ...initialStates });
  const value = {
    dispatch,
    imgData: state.imgData,
    selections: state.selections,
  };

  return (
    <EditorContext.Provider
      value={value}
      {...props}
    />
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext)
  if (context === undefined) {
    throw new Error('useEditor must be used within a EditorProvider');
  }
  return context;
}
