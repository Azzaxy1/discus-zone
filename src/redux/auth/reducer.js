import { ActionType } from "./action";

const authUserReducer = (authUser = null, action = {}) => {
  switch (action.type) {
    case ActionType.LOGIN_SUCCESS:
      return action.payload.authUser;
    case ActionType.LOGOUT_SUCCESS:
      return null;
    default:
      return authUser;
  }
};

export { authUserReducer };
