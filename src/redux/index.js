import { configureStore } from "@reduxjs/toolkit";
import { authUserReducer } from "./auth/reducer";
import isLoadingReducer from "./loading/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isLoading: isLoadingReducer,
  },
});

export default store;
