import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getUserLogged, login, putAccessToken } from "../../utils/network-data";

const ActionType = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
};

const loginSucessActionCreator = (authUser) => {
  return {
    type: ActionType.LOGIN_SUCCESS,
    payload: {
      authUser,
    },
  };
};

const logoutSuccessActionCreator = () => {
  return {
    type: ActionType.LOGOUT_SUCCESS,
    payload: null,
  };
};

const asyncLoginSucess = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await login({ email, password });
      putAccessToken(token);

      const authUser = await getUserLogged();
      dispatch(loginSucessActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

const asyncLogoutSucess = () => {
  return (dispatch) => {
    dispatch(logoutSuccessActionCreator());
    putAccessToken("");
  };
};

export {
  ActionType,
  loginSucessActionCreator,
  logoutSuccessActionCreator,
  asyncLoginSucess,
  asyncLogoutSucess,
};
