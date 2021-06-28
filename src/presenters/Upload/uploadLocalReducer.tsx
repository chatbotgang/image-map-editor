export interface IInitLocalState {
  focusIndex: null | number;
  currentIndex: number;
  currentCropSelection: ICurrentCropState;
  cropSelectionDict: { [index: number]: ICurrentCropState | null };
}
export const initCropState = {
  currentIndex: 0,
  focusIndex: null,
  currentCropSelection: {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    isMoving: false,
  },
  cropSelectionDict: {
    // 0: {
    //   width: 0,
    //   height: 0,
    //   x: 0,
    //   y: 0,
    //   isMoving: false,
    // },
  },
};

export interface Action {
  type: string;
  payload: {
    currentIndex: number;
    x: number;
    y: number;
    isMoving: boolean;
    focusIndex: any;
  };
}

export const editorReducer: Reducer<IInitLocalState, Action> = (
  state,
  action
) => {
  switch (action.type) {
    case "setStartPosition":
      let newDict: any = null;
      if (action.payload.focusIndex) {
        newDict = {
          ...state.cropSelectionDict,
          [action.payload.focusIndex]: {
            ...state.cropSelectionDict[action.payload.focusIndex],
            x: action.payload.x,
            y: action.payload.y,
            isMoving: action.payload.isMoving as boolean,
          },
        };
      } else {
        newDict = {
          ...state.cropSelectionDict,
          [state.currentIndex]: {
            ...state.cropSelectionDict[state.currentIndex],
            x: action.payload.x,
            y: action.payload.y,
            isMoving: action.payload.isMoving as boolean,
          },
        };
      }
      return {
        ...state,
        currentCropSelection: {
          ...state.currentCropSelection,
          x: action.payload.x,
          y: action.payload.y,
          isMoving: action.payload.isMoving as boolean,
        },
        cropSelectionDict: newDict,
      };
    case "setEndPosition":
      return {
        ...state,
        cropSelectionDict: {
          ...state.cropSelectionDict,
          [state.currentIndex]: {
            ...state.cropSelectionDict[state.currentIndex],
            width: action.payload.x - state.currentCropSelection.x,
            height: action.payload.y - state.currentCropSelection.y,
            // width:
            //   action.payload.x - state.cropSelectionDict[state.currentIndex].x,
            // height:
            //   action.payload.y - state.cropSelectionDict[state.currentIndex].y,
          },
        },
      };
    case "moveEndPosition":
      return {
        ...state,
        cropSelectionDict: {
          ...state.cropSelectionDict,
          [Number(action.payload.focusIndex)]: {
            ...state.cropSelectionDict[Number(action.payload.focusIndex)],
            x: action.payload.x,
            y: action.payload.y,
          },
        },
      };
    case "releaseMovingLock":
      let newCurrentIndex: any = null;
      if (action.payload.focusIndex) {
        newCurrentIndex = state.currentIndex;
      } else {
        newCurrentIndex = state.currentIndex + 1;
      }
      return {
        ...state,
        currentIndex: newCurrentIndex,
        focusIndex: action.payload.focusIndex,
        currentCropSelection: {
          ...state.currentCropSelection,
          x: action.payload.x,
          y: action.payload.y,
          isMoving: action.payload.isMoving as boolean,
        },
      };
    case "removeSelection":
      const newSelectionDict = state.cropSelectionDict;
      delete newSelectionDict[Number(action.payload.focusIndex)];
      return {
        ...state,
        cropSelectionDict: {
          ...newSelectionDict,
        },
      };
    default:
      return state;
  }
};
