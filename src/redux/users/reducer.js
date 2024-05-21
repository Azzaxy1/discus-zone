import { ActionType } from "./action";

const usersReducer = (users = [], action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return action.payload.users;
    default:
      return users;
  }
};

const userLoggedReducer = (userLogged = [], action = {}) => {
  switch (action.type) {
    case ActionType.USER_LOGGED:
      return action.payload.user;
    default:
      return userLogged;
  }
};

export { usersReducer, userLoggedReducer };
