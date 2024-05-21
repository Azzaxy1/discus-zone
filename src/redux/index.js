import { configureStore } from "@reduxjs/toolkit";
import { authUserReducer } from "./auth/reducer";
import isLoadingReducer from "./loading/reducer";
import { usersReducer } from "./users/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isLoading: isLoadingReducer,
    users: usersReducer,
  },
});

export default store;
