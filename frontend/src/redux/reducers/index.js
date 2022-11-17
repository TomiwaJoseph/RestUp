import { combineReducers } from "redux";
import { roomReducer } from "./roomReducer";

const reducers = combineReducers({
  store: roomReducer,
});

export default reducers;
