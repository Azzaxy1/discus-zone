import { ActionType } from "./action";

const threadDetailReducer = (detailThread = null, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.detailThread;
    case ActionType.ADD_COMMENT:
      return {
        ...detailThread,
        comments: [
          action.payload.comment?.data?.comment,
          ...detailThread.comments,
        ],
      };
    default:
      return detailThread;
  }
};

export default threadDetailReducer;
