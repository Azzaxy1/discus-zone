import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { getAllThreads, getAllUsers } from '../../utils/network-data'
import { receiveUsersActionCreator } from '../users/action'
import { receiveThreadsActionCreator } from '../threads/action'
import toast from 'react-hot-toast'

const asyncPopulateUsersAndThreads = () => {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      const users = await getAllUsers()
      const threads = await getAllThreads()

      dispatch(receiveUsersActionCreator(users))
      dispatch(receiveThreadsActionCreator(threads))
    } catch (error) {
      toast.error(error.message)
    } finally {
      dispatch(hideLoading())
    }
  }
}

export { asyncPopulateUsersAndThreads }
