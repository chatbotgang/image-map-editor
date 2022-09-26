import type { Coordinate } from "types/coordinate";
import COORDINATE_ACTIONS from "./coordinateActions";

type CoordinateActionType =
  typeof COORDINATE_ACTIONS[keyof typeof COORDINATE_ACTIONS];

interface CoordinateAction {
  type: CoordinateActionType;
  payload: Coordinate;
}

const coordinateReducer = (
  coordinates: Coordinate[],
  action: CoordinateAction
) => {
  switch (action.type) {
    case COORDINATE_ACTIONS.added: {
      return [...coordinates, action.payload];
    }
    case COORDINATE_ACTIONS.updated: {
      return coordinates.map((coordinate) =>
        coordinate.id === action.payload.id ? action.payload : coordinate
      );
    }
    case COORDINATE_ACTIONS.removed: {
      return coordinates.filter(
        (coordinate) => coordinate.id !== action.payload.id
      );
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export default coordinateReducer;
