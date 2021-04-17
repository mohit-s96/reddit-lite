import { store } from "../pmr/pmrLibrary";
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

export const login = (state: State) => {
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
      } else {
        console.log("Error - Invalid Details");
      }
    })
    .catch((err) => console.log(err));
};
