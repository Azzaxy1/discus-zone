/**
 * skenario test
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call toast.error correctly when data fetching failed
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getAllThreads, getAllUsers } from '../../utils/network-data'
import { asyncPopulateUsersAndThreads } from './action'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { receiveThreadsActionCreator } from '../threads/action'
import { receiveUsersActionCreator } from '../users/action'
import toast from 'react-hot-toast'

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0
  }
]

const fakeUsersRespones = [
  {
    id: 'user-1',
    name: 'Name 1',
    email: 'name1@example.com',
    avatar: 'https://generated-image-url.jpg'
  }
]

const fakeErrorResponse = new Error('Ups, something went wrong')

vi.mock('../../utils/network-data', () => {
  return {
    getAllUsers: vi.fn(),
    getAllThreads: vi.fn()
  }
})

vi.mock('react-hot-toats', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    error: vi.fn()
  }
})

describe('asyncPopulateUsersAndThreads', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should dispatch action correctly when data fetching success', async () => {
    getAllThreads.mockResolvedValue(fakeThreadsResponse)
    getAllUsers.mockResolvedValue(fakeUsersRespones)
    const dispatch = vi.fn()

    await asyncPopulateUsersAndThreads()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersRespones))
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch action and call toast.error correctly when data fetching failed', async () => {
    getAllUsers.mockRejectedValue(fakeErrorResponse)
    getAllThreads.mockRejectedValue(fakeErrorResponse)
    const dispatch = vi.fn()
    const toastSpy = vi.spyOn(toast, 'error')

    await asyncPopulateUsersAndThreads()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(toastSpy).toHaveBeenCalledWith(fakeErrorResponse.message)
    toastSpy.mockRestore()
  })
})
