// Reducer function

function reducer(
  state = { one: 0, two: 0, users: [], loading: false },
  action
) {
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
        users: [...state.users, ...action.payload],
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
}

//Redux-like createstore

function createStore(reducer) {
  let state;
  let arr = [];
  function getData() {
    return state;
  }
  function dispatch(action) {
    const prevState = deepCopyObject({}, state);
    state = reducer(state, action);
    const { objDiff } = objectComparator();
    let diffState = objDiff(state, prevState);
    console.log("State---------------------------------");
    console.log(state);
    console.log("--------------------------------------");
    console.log("PrevState-----------------------------");
    console.log(prevState);
    console.log("--------------------------------------");
    console.log("DiffState-----------------------------");
    console.log(diffState);
    console.log("--------------------------------------");
    arr.forEach(function (x) {
      if (false) {
        x.listener(state[x.stateProp]);
      } else {
        x.listener(state);
      }
    });
  }
  function subscribe(listener, stateProp) {
    stateProp = stateProp || null;
    arr.push({ listener, stateProp });
    return function () {
      arr = arr.filter((x) => x.listener !== listener);
    };
  }

  dispatch({});
  return { getData: getData, dispatch: dispatch, subscribe: subscribe };
}

let store = createStore(reducer);

//Use store hook (for react) -- needs improvements

const useStore = (str) => {
  let [count, setCount] = React.useState();
  const [unsub, setUnsub] = React.useState(() => () => {});
  const sub = () => {
    let uns = store.subscribe(setCount, str);
    setUnsub(() => uns);
  };
  React.useEffect(() => {
    if (str) {
      setCount(0);
    } else {
      setCount(store.getData());
    }
    sub();
  }, []);
  const dispatchAction = (action) => {
    store.dispatch(action);
  };
  return { count: count, setCount: dispatchAction, unsub: unsub, sub: sub };
};

// Higher order function for modifying react functional components

function connectHoc(component, stateSlice) {
  if (typeof component !== "function" || typeof stateSlice !== "function") {
    throw new Error("Invalid argument type to connect");
  }

  const calculatedState = stateSlice(store.getData());

  component.reduxState = calculatedState;

  return component;
}
