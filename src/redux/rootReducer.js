import { combineReducers } from "@reduxjs/toolkit";
import { authUserReducer } from "./auth/reducer";
import isLoadingReducer from "./loading/reducer";
import { userLoggedReducer, usersReducer } from "./users/reducer";
import { threadsReducer } from "./threads/reducer";
import threadDetailReducer from "./threadDetail/reducer";
import { leaderboardsReducer } from "./leaderboards/reducer";
import { loadingBarReducer } from "react-redux-loading-bar";

const rootReducer = combineReducers({
  authUser: authUserReducer,
  isLoading: isLoadingReducer,
  users: usersReducer,
  userLogged: userLoggedReducer,
  threads: threadsReducer,
  detailThread: threadDetailReducer,
  leaderboards: leaderboardsReducer,
  loadingBar: loadingBarReducer,
});

export { rootReducer };
