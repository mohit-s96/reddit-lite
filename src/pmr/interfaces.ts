export interface ReducerAction {
  type?: string;
  payload?: Array<unknown>;
}
export interface State {
  one: number;
  two: number;
  users: Array<unknown>;
  test: {
    newTest: {
      isAuth: boolean;
    };
  };
  loading: boolean;
}
export type Reducer = (state: State, action: ReducerAction) => State;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateSlice = (state: State) => State | any;

export interface listeners {
  // eslint-disable-next-line @typescript-eslint/ban-types
  listener: React.Dispatch<React.SetStateAction<{}>>;
  reduxState: Array<string>;
}
