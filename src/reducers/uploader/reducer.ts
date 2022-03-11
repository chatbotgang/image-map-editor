import { UploaderAction } from './action';
import { UploaderEnum } from './enum';
import { UploaderState } from './state';

export const uploaderReducer = (
  state: UploaderState,
  action: UploaderAction
): UploaderState => {
  switch (action.type) {
    case UploaderEnum.SetOriginalImageSrc:
      return { ...state, originalImageSrc: action.payload };
    case UploaderEnum.SetOriginalImageName:
      return { ...state, originalImageName: action.payload };
    case UploaderEnum.SetOriginalImageWidth:
      return { ...state, originalImageWidth: action.payload };
    case UploaderEnum.SetOriginalImageHeight:
      return { ...state, originalImageHeight: action.payload };
    case UploaderEnum.AddCoordinate:
      return { ...state, coordinates: [...state.coordinates, action.payload] };
    case UploaderEnum.DeleteCoordinate:
      return {
        ...state,
        coordinates: state.coordinates.filter(
          (c) => c.id === action.payload.id
        ),
      };
    default:
      return state;
  }
};
