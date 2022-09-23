import {
  useContext,
  useReducer,
  createContext,
  ReactNode,
} from 'react';

// state
interface Selection {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface EditorState {
  img: null | HTMLImageElement;
  selections: Selection[];
}

// reducer
type Action =
  | { type: 'add-image'; img: HTMLImageElement }
  | { type: 'delete-image'; }
  | { type: 'add-selection'; selection: Selection }
  | { type: 'delete-selection'; selectionId: Pick<Selection, 'id'> }
  | { type: 'update-selection'; selectionIndex: number; selection: Selection }
type Dispatch = (action: Action) => void;

const initialStates: EditorState = {
  img: null,
  selections: [],
};

function editorReducer(state: EditorState, action: Action) {
  switch(action.type) {
    case 'add-image':
      return {
        ...state,
        img: action.img
      };
    case 'delete-image': 
      return { ...initialStates };
    case 'add-selection':
      return { 
        ...state, 
        selections: state.selections.concat(action.selection)
      };
    case 'update-selection':
      return {
        ...state,
        selections: [
          ...state.selections.slice(0, action.selectionIndex),
          action.selection,
          ...state.selections.slice(action.selectionIndex + 1),
        ]
      };
    case 'delete-selection':
      return { ...state };
    default: 
      return state;
  }
};

// context
interface ContextInterface {
  state: EditorState;
  dispatch: Dispatch;
}

const EditorContext = createContext<ContextInterface | undefined>(undefined);
EditorContext.displayName = 'EditorContext';



const EditorProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(editorReducer, { ...initialStates });
  const value = { state, dispatch };

  return (
    <EditorContext.Provider
      value={value}
      {...props}
    />
  );
};

const useEditor = () => {
  const context = useContext(EditorContext)
  if (context === undefined) {
    throw new Error('useEditor must be used within a EditorProvider');
  }
  return context;
}

export {
  useEditor,
  EditorProvider,
}
