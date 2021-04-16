/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { reducer } from "./reducer";
import { Reducer, State, ReducerAction, listeners } from "./interfaces";
import {
  deepCopyObject,
  objectComparator,
  compareArrayToObject,
  getStateSlice,
} from "../utils/utiFuntions";
//Redux-like createstore

function createStore(reducer: Reducer) {
  let state: State;
  let arr: Array<listeners> = [];
  function getData() {
    return state;
  }
  function dispatch(action: ReducerAction) {
    const prevState = deepCopyObject({}, state);
    state = reducer(state, action);
    const { objDiff } = objectComparator();
    const diffState = objDiff(state, prevState);
    // console.log(diffState);
    // console.log("State---------------------------------");
    // console.log(state);
    // console.log("--------------------------------------");
    // console.log("PrevState-----------------------------");
    // console.log(prevState);
    // console.log("--------------------------------------");
    // console.log("DiffState-----------------------------");
    // console.log(diffState);
    // console.log("--------------------------------------");
    arr.forEach(function (x) {
      //   console.log(x.reduxState);
      const shouldUpdate = compareArrayToObject(diffState, x.reduxState);
      //   console.log(x.reduxState, diffState, shouldUpdate);
      if (shouldUpdate) {
        // console.log(x.reduxState);
        const dataNeeded = getStateSlice(getData(), x.reduxState);
        x.listener(dataNeeded);
      }
    });
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  function subscribe(
    listener: React.Dispatch<React.SetStateAction<{}>>,
    reduxState: Array<string>
  ) {
    // stateProp = stateProp || null;
    arr.push({ listener, reduxState });
    return function () {
      arr = arr.filter((x) => x.listener !== listener);
    };
  }

  dispatch({});
  return { getData: getData, dispatch: dispatch, subscribe: subscribe };
}

export const store = createStore(reducer);

//Use store hook (for react) -- needs improvements

// Higher order function for modifying react functional components
