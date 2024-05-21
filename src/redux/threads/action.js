import { hideLoading, showLoading } from "react-redux-loading-bar";
import { createThread } from "../../utils/network-data";

const ActionType = {
  RECEIVE_THREAD: "RECEIVE_THREAD",
  ADD_THREAD: "ADD_THREAD",
};

const receiveThreadsActionCreator = (threads) => {
  return {
    type: ActionType.RECEIVE_THREAD,
    payload: {
      threads,
    },
  };
};

const addThreadActionCreator = (thread) => {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
};

const asyncAddThread = ({ title, body, category }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
};

export { ActionType, receiveThreadsActionCreator, asyncAddThread };
