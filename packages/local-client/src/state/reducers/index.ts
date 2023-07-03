import { combineReducers } from "redux";
import cellReducer from "./cellReducer";
import bundleReducer from "./bundlesReducer";

const reducers = combineReducers({
  cell: cellReducer,
  bundles: bundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
