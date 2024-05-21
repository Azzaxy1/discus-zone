import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getAllThreads, getAllUsers } from "../../utils/network-data";
import { receiveUsersActionCreator } from "../users/action";
import { receiveThreadsActionCreator } from "../threads/action";

const asyncPopulateUserAndThreads = () => {
  // TODO: Get USER AND THREAD
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const users = await getAllUsers();
      const threads = await getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
};

export { asyncPopulateUserAndThreads };
