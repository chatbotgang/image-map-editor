export interface IInitLocalState {}
export interface Action {
  type: string;
  payload: number;
}
export const initLocalState: IInitLocalState = {};

const reducer: Reducer<IInitLocalState, Action> = (state, action) => {
  // const { type, payload } = action;
  return state;
};

export default reducer;
