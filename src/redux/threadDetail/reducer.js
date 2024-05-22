import { ActionType } from "./action";

const threadDetailReducer = (detailThread = null, action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.detailThread;
    case ActionType.ADD_COMMENT:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments],
      };
    case ActionType.UP_VOTE_COMMENT: {
      const newComment = detailThread?.comments?.map((comment) => {
        if (comment.id === action.payload.data.vote.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(
              action.payload.data.vote.userId
            )
              ? comment.upVotesBy.filter(
                  (id) => id !== action.payload.data.vote.userId
                )
              : [...comment.upVotesBy, action.payload.data.vote.userId],
          };
        }
        return comment;
      });
      return { ...detailThread, comments: newComment };
    }
    case ActionType.DOWN_VOTE_COMMENT: {
      const newComment = detailThread?.comments?.map((comment) => {
        if (comment.id === action.payload.data.vote.commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.includes(
              action.payload.data.vote.userId
            )
              ? comment.downVotesBy.filter(
                  (id) => id !== action.payload.data.vote.userId
                )
              : [...comment.downVotesBy, action.payload.data.vote.userId],
          };
        }
        return comment;
      });
      return { ...detailThread, comments: newComment };
    }
    default:
      return detailThread;
  }
};

export default threadDetailReducer;
