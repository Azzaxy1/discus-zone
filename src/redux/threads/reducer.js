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
    default:
      return threads;
  }
};

export { threadsReducer };
