import React from "react";
import { StateSlice, ReducerAction } from "./interfaces";
import { store } from "./pmrLibrary";
import {
  getObjectMatchFromFunctionString,
  getStateSlice,
} from "../utils/utiFuntions";
export function ConnectHoc(
  Component_: React.FunctionComponent,
  stateSlice: StateSlice
): React.FunctionComponent {
  if (typeof Component_ !== "function" || typeof stateSlice !== "function") {
    throw new Error("Invalid argument type to connect");
  }

  const objArray = getObjectMatchFromFunctionString(String(stateSlice));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Component_ as any).reduxState = objArray;

  return Component_;
}

export const useStore = (
  comp: React.FunctionComponent
  // eslint-disable-next-line @typescript-eslint/ban-types
): [count: {}, dispatchAction: (action: ReducerAction) => void] => {
  const [count, setCount] = React.useState({});
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [, setUnsub] = React.useState(() => () => {});
  const sub = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uns = store.subscribe(setCount, (comp as any).reduxState);
    setUnsub(() => uns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setCount(getStateSlice(store.getData(), (comp as any).reduxState));
    sub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatchAction = React.useCallback((action) => {
    store.dispatch(action);
  }, []);
  return [count, dispatchAction];
};
