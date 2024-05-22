import { hideLoading, showLoading } from "react-redux-loading-bar";
import {
  createThread,
  downVoteThread,
  getAllThreads,
  getAllUsers,
  upVoteThread,
} from "../../utils/network-data";
import { receiveUsersActionCreator } from "../users/action";
import toast from "react-hot-toast";

const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  ADD_THREAD: "ADD_THREAD",
  UP_VOTE_THREAD: "UP_VOTE_THREAD",
  DOWN_VOTE_THREAD: "DOWN_VOTE_THREAD",
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

const upVoteThreadActionCreator = ({ threadId, userId }) => {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
};

const downVoteThreadActionCreator = ({ threadId, userId }) => {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
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
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

const asyncAddThread = ({ title, category, body }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const data = await createThread({ title, category, body });
      dispatch(addThreadActionCreator(data?.data?.thread));
      toast.success("Thread baru ditambahkan");
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

const asyncUpVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await upVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    } finally {
      dispatch(hideLoading());
    }
  };
};

const asyncDownVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await downVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
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
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  asyncUpVoteThread,
  asyncDownVoteThread,
};
