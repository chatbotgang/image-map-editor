import { Coordinate } from '../../types';

export type UploaderState = {
  originalImageWidth?: number;
  originalImageHeight?: number;
  coordinates: Coordinate[];
};
