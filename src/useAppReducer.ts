import { useReducer } from 'react';

export interface ImageInfo {
  offsetLeft: number;
  offsetTop: number;
  offsetWidth: number;
  offsetHeight: number;
  naturalWidth: number;
  naturalHeight: number;
}

export interface MouseEventData {
  pageX: number;
  pageY: number;
}

export type Record = {
  id: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  removed: boolean;
};

interface State {
  id: number;
  src: string;
  info: ImageInfo | null;
  mouseDownData: MouseEventData | null;
  records: Record[];
}

enum AppActionTypes {
  SetImage = 'SET_IMAGE',
  SetInfo = 'SET_INFO',
  SetMouseDown = 'SET_MOUSE_DOWN',
  SetMouseUp = 'SET_MOUSE_UP',
  PullRecord = 'PULL_RECORD',
}

interface Action {
  type: AppActionTypes;
}

interface SetImageAction extends Action {
  payload: {
    src: string;
  };
}

interface SetInfoAction extends Action {
  payload: {
    info: ImageInfo;
  };
}

interface SetMouseDownAction extends Action {
  payload: {
    mouseEventData: MouseEventData;
  };
}

interface SetMouseUpAction extends Action {
  payload: {
    mouseEventData: MouseEventData;
  };
}

interface PullRecordAction extends Action {
  payload: {
    id: number;
  };
}

export interface Actions {
  setImage: (src: string) => void;
  setInfo: (info: ImageInfo) => void;
  setMouseDown: (mouseEventData: MouseEventData) => void;
  setMouseUp: (mouseEventData: MouseEventData) => void;
  pullRecord: (id: number) => void;
}

export const initialState: State = {
  id: 0,
  src: '',
  info: null,
  mouseDownData: null,
  records: [],
};

function isSetImage(action: Action): action is SetImageAction {
  return action.type === AppActionTypes.SetImage;
}

function isSetInfo(action: Action): action is SetInfoAction {
  return action.type === AppActionTypes.SetInfo;
}

function isSetMouseDown(action: Action): action is SetMouseDownAction {
  return action.type === AppActionTypes.SetMouseDown;
}

function isSetMouseUp(action: Action): action is SetMouseUpAction {
  return action.type === AppActionTypes.SetMouseUp;
}

function isPullRecord(action: Action): action is PullRecordAction {
  return action.type === AppActionTypes.PullRecord;
}

export function enhanceRecord({
  record,
  info,
}: {
  record: Record;
  info: ImageInfo;
}): Record {
  return {
    id: record.id,
    removed: record.removed,
    left: Math.max(record.left - info.offsetLeft, 0),
    right: Math.min(record.right - info.offsetLeft, info.offsetWidth),
    top: Math.max(record.top - info.offsetTop, 0),
    bottom: Math.min(record.bottom - info.offsetTop, info.offsetHeight),
  };
}

function reducer(state: State, action: Action) {
  if (isSetImage(action)) {
    return {
      ...state,
      src: action.payload.src,
    };
  }
  if (isSetInfo(action)) {
    return {
      ...state,
      info: action.payload.info,
      records: state.records.map(record =>
        enhanceRecord({ record, info: action.payload.info }),
      ),
    };
  }
  if (isSetMouseDown(action)) {
    return {
      ...state,
      mouseDownData: action.payload.mouseEventData,
    };
  }
  if (isSetMouseUp(action)) {
    if (state.mouseDownData === null) {
      return state;
    }
    if (
      state.mouseDownData.pageX === action.payload.mouseEventData.pageX &&
      state.mouseDownData.pageY === action.payload.mouseEventData.pageY
    ) {
      return {
        ...state,
        mouseDownData: null,
      };
    }
    const record: Record = {
      id: state.id + 1,
      left: Math.min(
        state.mouseDownData.pageX,
        action.payload.mouseEventData.pageX,
      ),
      right: Math.max(
        state.mouseDownData.pageX,
        action.payload.mouseEventData.pageX,
      ),
      top: Math.min(
        state.mouseDownData.pageY,
        action.payload.mouseEventData.pageY,
      ),
      bottom: Math.max(
        state.mouseDownData.pageY,
        action.payload.mouseEventData.pageY,
      ),
      removed: false,
    };
    return {
      ...state,
      id: state.id + 1,
      mouseDownData: null,
      records: [
        ...state.records,
        state.info === null
          ? record
          : enhanceRecord({ record, info: state.info }),
      ],
    };
  }
  if (isPullRecord(action)) {
    return {
      ...state,
      records: state.records.map(record => {
        if (record.id !== action.payload.id) {
          return record;
        }
        return {
          ...record,
          removed: true,
        };
      }),
    };
  }
  return state;
}

export default (): [State, Actions] => {
  const [state, dispatch]: [
    State,
    React.Dispatch<
      | SetImageAction
      | SetInfoAction
      | SetMouseDownAction
      | SetMouseUpAction
      | PullRecordAction
    >,
  ] = useReducer(reducer, initialState);
  return [
    state,
    {
      setImage: (src: string) => {
        dispatch({
          type: AppActionTypes.SetImage,
          payload: {
            src,
          },
        });
      },
      setInfo: (info: ImageInfo) => {
        dispatch({
          type: AppActionTypes.SetInfo,
          payload: {
            info,
          },
        });
      },
      setMouseDown: (mouseEventData: MouseEventData) => {
        dispatch({
          type: AppActionTypes.SetMouseDown,
          payload: {
            mouseEventData,
          },
        });
      },
      setMouseUp: (mouseEventData: MouseEventData) => {
        dispatch({
          type: AppActionTypes.SetMouseUp,
          payload: {
            mouseEventData,
          },
        });
      },
      pullRecord: (id: number) => {
        dispatch({
          type: AppActionTypes.PullRecord,
          payload: {
            id,
          },
        });
      },
    },
  ];
};
