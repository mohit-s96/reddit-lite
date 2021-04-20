import { store } from "../pmr/store";
import { State } from "../Components/Interfaces/Auth";
import { ProfileData } from "../pmr/interfaces";

export const fetchOnLoad = () => {
  store.dispatch({
    type: "LOADING",
  });
  const arr: Array<Promise<Response>> = [];
  for (let i = 0; i < 5; i++) {
    arr.push(fetch("https://jsonplaceholder.typicode.com/users/" + (i + 1)));
  }
  Promise.all(arr)
    .then((res) => {
      const arr: Array<Promise<Response>> = [];
      res.forEach((x) => {
        arr.push(x.json());
      });
      return Promise.all(arr);
    })
    .then((res) => {
      // console.log(res);
      // let arr = res.map((x) => x.results[0]);
      // console.log(arr);
      store.dispatch({
        type: "LOADED",
      });
      store.dispatch({
        type: "ADD_USER",
        payload: res,
      });
    });
};

export const fetchAndDispatch = () => {
  fetch(
    "https://jsonplaceholder.typicode.com/users/" +
      (Math.floor(Math.random() * 9) + 1)
  )
    .then((res) => res.json())
    .then((res) => {
      store.dispatch({
        type: "ADD_USER",
        payload: [res],
      });
    });
};

export const subOne = () => {
  store.dispatch({ type: "DECREMENT" });
};

export const addOne = () => {
  store.dispatch({ type: "INCREMENT" });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = (state: State, history: any) => {
  store.dispatch({
    type: "AUTH_LOADING",
  });
  // console.log(state);

  fetch(
    `http://localhost:3000/results?email=${state.email}&login.password=${state.password}`
  )
    .then((res) => res.json())
    .then((res: ProfileData[]) => {
      // console.log(res);

      if (res.length) {
        store.dispatch({
          type: "AUTH_LOADED",
        });
        store.dispatch({
          type: "USER_LOADED",
          payload: res[0],
        });
        history.push("/");
      } else {
        console.log("Error - Invalid Details");
      }
    })
    .catch((err) => console.log(err));
};

export const logout = () => {
  store.dispatch({
    type: "LOGOUT",
  });
};

export const flipProfile = () => {
  store.dispatch({ type: "FLIP_PROFILE" });
};

export const setActiveSub = (str: string) => {
  store.dispatch({
    type: "ACTIVE_SUB",
    payload: str,
  });
  loadPosts(str);
};

export const loadPosts = (str: string) => {
  store.dispatch({ type: "LOADING_POSTS" });
  fetch(`https://www.reddit.com/r/${str}.json`)
    .then((res) => res.json())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((res: any) => {
      const id = res.data.after;
      const arr = res.data.children
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((x: any) => x.data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((x: any) => !x.stickied);
      store.dispatch({
        type: "LOADED_POSTS",
        payload: { posts: arr, next: id },
      });
      loadPagination();
    })
    .catch((err) => console.log(err));
};

export const loadPagination = () => {
  store.dispatch({ type: "LOADING_PAGINATION" });
  const str = (store.getData() as any).activeSub;
  const nexId = (store.getData() as any).nextPageId;
  fetch(`https://www.reddit.com/r/${str}.json?after=${nexId}`)
    .then((res) => res.json())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((res: any) => {
      const id = res.data.after;
      const arr = res.data.children
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((x: any) => x.data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((x: any) => !x.stickied);

      store.dispatch({
        type: "LOADED_PAGINATION",
        payload: { posts: arr, next: id },
      });
    })
    .catch((err) => console.log(err));
};
