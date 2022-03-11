import { Coordinate } from '../../types';

export type UploaderState = {
  originalImageSrc?: string;
  originalImageName?: string;
  originalImageWidth?: number;
  originalImageHeight?: number;
  coordinates: Coordinate[];
};
