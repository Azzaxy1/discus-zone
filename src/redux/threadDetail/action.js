import { hideLoading, showLoading } from "react-redux-loading-bar";
import { createComment, getDetailThread } from "../../utils/network-data";

const ActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  ADD_COMMENT: "ADD_COMMENT",
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

const asyncThreadDetail = (id) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { data } = await getDetailThread(id);
      dispatch(receiveThreadDetailActionCreator(data.detailThread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

const asyncAddComment = ({ id, content }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await createComment({ id, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
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
};
