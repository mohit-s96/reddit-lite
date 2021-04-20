import { createStore, createStoreHook } from "pmrjs";
import { reducer } from "./reducer";

export const store = createStore(reducer);

export const useStore = createStoreHook(store);
