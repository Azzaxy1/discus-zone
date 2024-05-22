import { register } from "../../utils/network-data";
import toast from "react-hot-toast";

const ActionType = {
  RECEIVE_USERS: "RECEIVE_USERS",
};

const receiveUsersActionCreator = (users) => {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
};

const asyncRegisterUser = ({ name, email, password }) => {
  return async () => {
    try {
      await register({ name, email, password });
      toast.success("Register success, please login");
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
