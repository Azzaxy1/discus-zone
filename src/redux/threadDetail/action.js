import { hideLoading, showLoading } from "react-redux-loading-bar";
import {
  createComment,
  downVoteComment,
  getDetailThread,
  upVoteComment,
} from "../../utils/network-data";
import toast from "react-hot-toast";

const ActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  ADD_COMMENT: "ADD_COMMENT",
  UP_VOTE_COMMENT: "UP_VOTE_COMMENT",
  DOWN_VOTE_COMMENT: "DOWN_VOTE_COMMENT",
};

const receiveThreadDetailActionCreator = (detailThread) => {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      detailThread,
    },
  };
};

const addCommentActionCreator = (comment) => {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
};

const upVoteCommentActionCreator = (data) => {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      data,
    },
  };
};

const downVoteCommentActionCreator = (data) => {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      data,
    },
  };
};

const asyncThreadDetail = (id) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data } = await getDetailThread(id);
      dispatch(receiveThreadDetailActionCreator(data.detailThread));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

const asyncAddComment = ({ id, content }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await createComment({ id: id, content: content });
      dispatch(addCommentActionCreator(comment?.data?.comment));
      toast.success("Berhasil menambahkan komentar");
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

const asyncUpVoteComment = (commentId) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { detailThread } = getState();

    try {
      const { data } = await upVoteComment(detailThread.id, commentId);
      dispatch(upVoteCommentActionCreator(data));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

const asyncDownVoteComment = (commentId) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { detailThread } = getState();

    try {
      const { data } = await downVoteComment(detailThread.id, commentId);
      dispatch(downVoteCommentActionCreator(data));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

export {
  ActionType,
  addCommentActionCreator,
  receiveThreadDetailActionCreator,
  asyncThreadDetail,
  asyncAddComment,
  upVoteCommentActionCreator,
  asyncUpVoteComment,
  asyncDownVoteComment,
};
