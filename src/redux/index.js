import { applyMiddleware, createStore } from "redux";

import { loadingBarMiddleware } from "react-redux-loading-bar";
import { thunk } from "redux-thunk";
import { rootReducer } from "./rootReducer";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, loadingBarMiddleware())
);

export default store;
