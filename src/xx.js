function objectComparator() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let diffState = {};
  let objHeirarchy = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const objDiff = (newState, oldState) => {
    // console.log(newState, oldState);
    if (
      typeof newState !== "object" ||
      typeof oldState !== "object" ||
      !newState ||
      !oldState
    ) {
      throw new Error("Arguments to objDiff must be object type");
    }
    if (Array.isArray(newState) && Array.isArray(oldState)) {
      if (newState.length !== oldState.length) {
        diffState = setNestedKeys(diffState, objHeirarchy, true);
      } else {
        newState.forEach((item, i) => {
          if (Array.isArray(item)) {
            objDiff(item, oldState[i]);
          } else if (typeof item !== "object") {
            if (item !== oldState[i]) {
              diffState = setNestedKeys(diffState, objHeirarchy, true);
            }
          } else {
            objDiff(item, oldState[i]);
          }
        });
      }
    } else {
      for (const key in newState) {
        if (oldState[key] !== undefined && oldState[key] !== null) {
          if (typeof newState[key] !== "object") {
            if (newState[key] !== oldState[key]) {
              if (!objHeirarchy.length) {
                diffState[key] = true;
              } else {
                diffState = setNestedKeys(diffState, objHeirarchy, key);
              }
            }
          } else {
            objHeirarchy.push(key);
            objDiff(newState[key], oldState[key]);
            objHeirarchy.pop();
          }
        } else {
          if (!objHeirarchy.length) {
            diffState[key] = true;
          } else {
            diffState = setNestedKeys(diffState, objHeirarchy, key);
          }
        }
      }
    }
    return diffState;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setNestedKeys(state, keys, finalKey) {
    const tempState = { ...state };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let nextKey = null;
    const n = keys.length;
    keys.forEach((key, i) => {
      if (!nextKey) {
        if (!tempState[key]) {
          tempState[key] = {};
        }
        nextKey = tempState[key];
        if (n == 1) {
          nextKey[finalKey] = true;
        }
      } else {
        if (i === n - 1) {
          nextKey[key] = finalKey;
        } else {
          nextKey[key] = {};
          nextKey = nextKey[key];
        }
      }
    });
    //   console.log(tempState);
    return tempState;
  }
  return {
    objDiff: objDiff,
  };
}

const { objDiff } = objectComparator();

const newState = {
  loading: false,
  posts: [],
  user: {
    gender: "male",
    name: {
      title: "Mr",
      first: "Curtis",
      last: "Rogers",
    },
    location: {
      street: {
        number: 1488,
        name: "North Street",
      },
      city: "Bath",
      state: "Herefordshire",
      country: "United Kingdom",
      postcode: "C8L 8FX",
      coordinates: {
        latitude: "75.1986",
        longitude: "-120.4553",
      },
      timezone: {
        offset: "+7:00",
        description: "Bangkok, Hanoi, Jakarta",
      },
    },
    email: "curtis.rogers@example.com",
    login: {
      uuid: "64241211-5efb-4d07-844a-728ffdeb292f",
      username: "bluemouse282",
      password: "simpson",
      salt: "m9c9XS8J",
      md5: "899e8f1e6727bb74a229136f382056a5",
      sha1: "16b1b9b908f1e1f1eea8c87f210dbe378d58a015",
      sha256:
        "865b17f52121f0ff519043bb37d0a80ec9a885d2aea046b0c1ca02fb9b168449",
    },
    dob: {
      date: "1984-08-31T18:14:45.860Z",
      age: 37,
    },
    registered: {
      date: "2017-07-19T15:21:33.400Z",
      age: 4,
    },
    phone: "015394 62336",
    id: "0741-056-221",
    identifier: {
      name: "NINO",
      value: "OE 87 45 94 N",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/18.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/18.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/18.jpg",
    },
    nat: "GB",
  },
};
const oldState = {
  loading: false,
  posts: [],
  user: {},
};

const n = objDiff(newState, oldState);
console.log(n);
