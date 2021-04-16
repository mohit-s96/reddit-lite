import { ReducerAction, Reducer, State } from "./interfaces";
export const reducer: Reducer = (
  state: State = {
    one: 0,
    two: 0,
    users: [],
    loading: false,
    test: { newTest: { isAuth: false } },
  },
  action: ReducerAction
) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        one: state.one + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        two: state.two - 1,
      };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, ...(action.payload as Array<string>)],
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "LOADED":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
