import { ReducerAction, Reducer, StoreState, ProfileData } from "./interfaces";
export const reducer: Reducer = (
  state: StoreState = {
    isAuth: false,
    loading: {
      authLoading: false,
      postsLoading: false,
    },
    posts: [],
    user: {},
  },
  action: ReducerAction
) => {
  if (action.type === "USER_LOADED") {
    // console.log({
    //   ...state,
    //   user: action.payload,
    // });
  }
  switch (action.type) {
    case "AUTH_LOADING":
      return {
        ...state,
        loading: {
          ...state.loading,
          authLoading: true,
        },
      };
    case "AUTH_LOADED":
      return {
        ...state,
        loading: {
          ...state.loading,
          authLoading: false,
        },
        isAuth: true,
      };
    case "USER_LOADED":
      return {
        ...state,
        user: { ...(action.payload as ProfileData) },
      };
    default:
      return state;
  }
};
