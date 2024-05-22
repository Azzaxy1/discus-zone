import { ActionType } from "./action";

const threadsReducer = (threads = [], action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return {
        ...threads,
        threads: [action.payload.thread, ...threads.threads],
      };
    case ActionType.TOGGLE_LIKE_THREAD:
      console.log(threads);
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : [...thread.upVotesBy, action.payload.userId],
          };
        }
        return thread;
      });
    default:
      return threads;
  }
};

export { threadsReducer };
