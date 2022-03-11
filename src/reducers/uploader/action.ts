import { UploaderEnum } from './enum';
import { ActionMap, Coordinate } from '../../types';

export type UploaderPayload = {
  [UploaderEnum.SetOriginalImageWidth]: number;
  [UploaderEnum.SetOriginalImageHeight]: number;
  [UploaderEnum.AddCoordinate]: Coordinate;
  [UploaderEnum.DeleteCoordinate]: Coordinate;
};

export type UploaderAction = ActionMap<UploaderPayload>[keyof UploaderPayload];
