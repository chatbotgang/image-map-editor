import { UploaderEnum } from './enum';
import { ActionMap, Coordinate } from '../../types';

export type UploaderPayload = {
  [UploaderEnum.SetOriginalImageSrc]: string;
  [UploaderEnum.SetOriginalImageName]: string;
  [UploaderEnum.SetOriginalImageWidth]: number;
  [UploaderEnum.SetOriginalImageHeight]: number;
  [UploaderEnum.SetStageWidth]: number;
  [UploaderEnum.SetStageHeight]: number;
  [UploaderEnum.SetRatio]: number;
  [UploaderEnum.AddCoordinate]: Coordinate;
  [UploaderEnum.DeleteCoordinate]: Coordinate;
};

export type UploaderAction = ActionMap<UploaderPayload>[keyof UploaderPayload];
