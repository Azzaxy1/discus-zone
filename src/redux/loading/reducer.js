import { ActionType } from './action'

const isLoadingReducer = (isLoading = true, action = {}) => {
  switch (action.type) {
    case ActionType.SET_IS_LOADING:
      return action.payload.isLoading
    default:
      return isLoading
  }
}

export default isLoadingReducer
