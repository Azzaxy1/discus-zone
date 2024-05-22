import { hideLoading, showLoading } from "react-redux-loading-bar";
import {
  createThread,
  getAllThreads,
  getAllUsers,
  upVoteThread,
} from "../../utils/network-data";
import { receiveUsersActionCreator } from "../users/action";
import toast from "react-hot-toast";

const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  ADD_THREAD: "ADD_THREAD",
  TOGGLE_LIKE_THREAD: "TOGGLE_LIKE_THREAD",
};

const receiveThreadsActionCreator = (threads) => {
  return {
    type: ActionType.RECEIVE_THREADS,
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

const toggleLikeThreadActionCreator = ({ threadId, userId }) => {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
};

const asyncSeeAllThreads = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const users = await getAllUsers();
      const { data } = await getAllThreads();

      dispatch(receiveUsersActionCreator(users.data.users));
      dispatch(receiveThreadsActionCreator(data.threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

const asyncAddThread = ({ title, body, category }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      toast.success("Thread baru ditambahkan");
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

const asyncToggleLikeThread = (threadId) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleLikeThreadActionCreator({ threadId, userId: authUser.id })
      );
    } finally {
      dispatch(hideLoading());
    }
  };
};

export {
  ActionType,
  receiveThreadsActionCreator,
  asyncAddThread,
  asyncSeeAllThreads,
  asyncToggleLikeThread,
  toggleLikeThreadActionCreator,
};
