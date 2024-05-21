import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getUserLogged } from "../../utils/network-data";
import { loginSucessActionCreator } from "../auth/action";

const ActionType = {
  SET_IS_LOADING: "SET_IS_LOADING",
};

const setIsLoadingActionCreator = (isLoading) => {
  return {
    type: ActionType.SET_IS_LOADING,
    payload: {
      isLoading,
    },
  };
};

const asyncIsLoadingProcess = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const authUser = await getUserLogged();
      dispatch(loginSucessActionCreator(authUser));
    } catch (error) {
      dispatch(setIsLoadingActionCreator(null));
    } finally {
      dispatch(setIsLoadingActionCreator(false));
    }

    dispatch(hideLoading());
  };
};

export { ActionType, asyncIsLoadingProcess, setIsLoadingActionCreator };
