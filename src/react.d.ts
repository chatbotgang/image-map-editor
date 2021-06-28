type Reducer<State, Action> = (state: State, action: Action) => State;
type Props = {
  children: JSX.Element;
};
type ILayoutState = {
  width: number;
  height: number;
  x: number;
  y: number;
  isMoving: boolean;
};

type ICurrentCropState = {
  width: number;
  height: number;
  x: number;
  y: number;
  isMoving: boolean;
};

type IRedizePayload = {
  x: number;
  y: number;
  width: number;
  height: number;
  isMoving: boolean;
};

type IMovePayload = {
  x: number;
  y: number;
  isMoving: boolean;
};
