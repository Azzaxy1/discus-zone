/**
 * test scenario for asyncLeaderboars
 *
 * - asyncLeaderboars thunk
 *  - should dispatch receiveLeaderboardsActionCreator correctly when data fetcing success
 *  - should dispatch action and call toast.error correctly when data fetching failed
 *
*/

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getLeaderboards } from '../../utils/network-data'
import { asyncLeaderboars, receiveLeaderboardsActionCreator } from './action'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import toast from 'react-hot-toast'

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'Name 1',
      email: 'name1@example.com',
      avatar: 'https://generated-image-url.jpg'
    },
    score: 10
  }
]

const fakeErrorResponse = new Error('Ups, something went wrong')

vi.mock('../../utils/network-data', () => {
  return {
    getLeaderboards: vi.fn()
  }
})

vi.mock('react-hot-toast', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    error: vi.fn()
  }
})

describe('asyncLeaderboars thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should dispatch receiveLeaderboardsActionCreator correctly when data fetcing success', async () => {
    getLeaderboards.mockResolvedValue((fakeLeaderboardsResponse))
    const dispatch = vi.fn()

    await asyncLeaderboars()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(fakeLeaderboardsResponse))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    getLeaderboards.mockRejectedValue(fakeErrorResponse)
    const dispatch = vi.fn()
    const toastSpy = vi.spyOn(toast, 'error')

    await asyncLeaderboars()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(toastSpy).toHaveBeenCalledWith(fakeErrorResponse.message)
    toastSpy.mockRestore()
  })
})
