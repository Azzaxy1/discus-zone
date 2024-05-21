import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getAllUsers, getUserLogged, register } from "../../utils/network-data";
import toast from "react-hot-toast";

const ActionType = {
  RECEIVE_USERS: "RECEIVE_USERS",
  USER_LOGGED: "USER_LOGGED",
};

const receiveUsersActionCreator = (users) => {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
};

const userLoggedActionCreator = (user) => {
  return {
    type: ActionType.USER_LOGGED,
    payload: {
      user,
    },
  };
};

const asyncSeeAllUsers = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await getAllUsers();
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
};

const asyncUserLogged = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const user = await getUserLogged();
      dispatch(userLoggedActionCreator(user));
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
};

const asyncRegisterUser = ({ name, email, password }) => {
  return async () => {
    try {
      await register({ name, email, password });
    } catch (error) {
      alert(error.message);
    }
  };
};

export {
  ActionType,
  receiveUsersActionCreator,
  asyncSeeAllUsers,
  asyncRegisterUser,
  asyncUserLogged,
};
