import { Reducer, ReducerAction } from "pmrjs/dist/core/interfaces";
import { StoreState, ProfileData } from "./interfaces";
export const reducer: Reducer = (
  state: StoreState = {
    isAuth: false,
    loading: {
      authLoading: false,
      postsLoading: false,
      paginationLoading: false,
    },
    modalStates: {
      profile: false,
    },
    activeSub: "",
    posts: [],
    user: {},
    nextPageId: "",
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
    case "LOGOUT":
      return {
        ...state,
        isAuth: false,
      };
    case "FLIP_PROFILE":
      return {
        ...state,
        modalStates: {
          ...state.modalStates,
          profile: !state.modalStates.profile,
        },
      };
    case "ACTIVE_SUB":
      return {
        ...state,
        activeSub: action.payload as string,
      };
    case "LOADING_POSTS":
      return {
        ...state,
        loading: {
          ...state.loading,
          postsLoading: true,
        },
      };
    case "LOADED_POSTS":
      return {
        ...state,
        loading: {
          ...state.loading,
          postsLoading: false,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        posts: (action.payload as any).posts as Array<[]>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nextPageId: (action.payload as any).next as string,
      };
    case "LOADING_PAGINATION":
      return {
        ...state,
        loading: {
          ...state.loading,
          paginationLoading: true,
        },
      };
    case "LOADED_PAGINATION":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const arr = (action.payload as any).posts.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (v: any, i: any, a: any) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          a.findIndex((t: any) => t.created === v.created) === i
      );
      return {
        ...state,
        loading: {
          ...state.loading,
          paginationLoading: false,
        },
        // eslint-disable-next-line @typescript-eslint/ban-types
        posts: [
          ...state.posts,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(arr as Array<[]>),
        ],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nextPageId: (action.payload as any).next as string,
      };
    default:
      return state;
  }
};
