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
function createStore(reducer) {
  let state;
  let arr = [];
  function getData() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    arr.forEach(function (x) {
      if (x.stateProp && state[x.stateProp] !== undefined) {
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
