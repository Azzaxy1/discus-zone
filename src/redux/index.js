import { configureStore } from "@reduxjs/toolkit";
import { authUserReducer } from "./auth/reducer";
import isLoadingReducer from "./loading/reducer";
import { usersReducer } from "./users/reducer";
import { leaderboardsReducer } from "./leaderboards/reducer";
import { threadsReducer } from "./threads/reducer";
import { loadingBarReducer } from "react-redux-loading-bar";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isLoading: isLoadingReducer,
    users: usersReducer,
    threads: threadsReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
