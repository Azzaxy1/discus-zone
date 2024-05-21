import { ActionType } from "./action";

const threadsReducer = (thread = [], action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD:
      return action.payload.thread;
    case ActionType.ADD_THREAD:
      return [...thread, action.payload.thread];
    default:
      return thread;
  }
};

export { threadsReducer };
