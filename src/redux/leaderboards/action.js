import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getLeaderboards } from "../../utils/network-data";

const ActionType = {
  RECEIVE_LEADERBOARDS: "RECEIVE_LEADERBOARDS",
};

const receiveLeaderboardsActionCreator = (leaderboards) => {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
};

const asyncLeaderboars = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
};

export { ActionType, receiveLeaderboardsActionCreator, asyncLeaderboars };
