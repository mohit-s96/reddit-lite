import { store } from "./store";
import { State } from "../Components/Interfaces/Auth";
// import { ProfileData } from "../pmr/interfaces";

const mockUserData = {
  gender: "male",
  name: { title: "Mr", first: "Frankie", last: "Pena" },
  location: {
    street: { number: 9904, name: "Green Lane" },
    city: "Portsmouth",
    state: "Devon",
    country: "United Kingdom",
    postcode: "TC20 6FA",
    coordinates: { latitude: "-60.2539", longitude: "-1.2482" },
    timezone: { offset: "+5:45", description: "Kathmandu" },
  },
  email: "frankie.pena@example.com",
  login: {
    uuid: "5bcf3a4f-ba97-459c-84a1-5ab1d5c9c835",
    username: "purplecat411",
    password: "david1",
    salt: "SQLEuJWr",
    md5: "070ce663715409cb4c5c88e870788171",
    sha1: "d431cb00fe37ee38c1e5ac6d7cb4c4dd90fb6ab7",
    sha256: "54e3f12bb2b2df421f74e26ade02ba538a487728a00858ac4579508f5f53ddc2",
  },
  dob: { date: "1978-12-06T00:31:27.695Z", age: 43 },
  registered: { date: "2014-10-02T01:40:09.126Z", age: 7 },
  phone: "020 7612 6622",
  id: "0714-529-485",
  identifier: { name: "NINO", value: "XE 35 73 37 Q" },
  picture: {
    large: "https://randomuser.me/api/portraits/men/9.jpg",
    medium: "https://randomuser.me/api/portraits/med/men/9.jpg",
    thumbnail: "https://randomuser.me/api/portraits/thumb/men/9.jpg",
  },
  nat: "GB",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = (state: State, history: any) => {
  store.dispatch({
    type: "AUTH_LOADING",
  });

  // USE WHEN MOCKING WITH JSON SERVER
  // fetch(
  //   `http://localhost:3000/results?email=${state.email}&login.password=${state.password}`
  // )
  //   .then((res) => res.json())
  //   .then((res: ProfileData[]) => {
  //     // console.log(res);

  //     if (res.length) {
  //       store.dispatch({
  //         type: "AUTH_LOADED",
  //       });
  //       store.dispatch({
  //         type: "USER_LOADED",
  //         payload: res[0],
  //       });
  //       history.push("/");
  //     } else {
  //       console.log("Error - Invalid Details");
  //     }
  //   })
  //   .catch((err) => console.log(err));
  setTimeout(() => {
    store.dispatch({
      type: "AUTH_LOADED",
    });
    store.dispatch({
      type: "USER_LOADED",
      payload: mockUserData,
    });
    history.push("/");
  }, 500);
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
    .catch((err) => {
      console.log(err);
      setActiveSub("memes");
    });
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
