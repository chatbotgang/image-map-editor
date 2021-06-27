type Reducer<State, Action> = (state: State, action: Action) => State;
type Props = {
  children: JSX.Element;
};
type ILayoutState = {
  width: number;
  height: number;
  x: number;
  y: number;
};
