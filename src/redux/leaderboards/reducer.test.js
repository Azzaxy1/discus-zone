/**
 * test scenario for leaderboardsReducer
 *
 * - leaderboardsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the leaderboards when given by RECEIVE_LEADERBOARDS action
 *
 */

import { describe, it, expect } from 'vitest'
import { leaderboardsReducer } from './reducer'
import { ActionType } from './action'

describe('leaderboardsReducer Function', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = []
    const action = { type: 'UNKNOWN' }

    const nextState = leaderboardsReducer(initialState, action)

    expect(nextState).toEqual(initialState)
  })
  it('should return the leaderboards when given by RECEIVE_LEADERBOARDS action', () => {
    const initialState = []
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards: [
          {
            user: {
              id: 'users-1',
              name: 'Name 1',
              email: 'name1@example.com',
              avatar: 'https://generated-image-url.jpg'
            },
            score: 10
          },
          {
            user: {
              id: 'users-2',
              name: 'Name 2',
              email: 'name2@example.com',
              avatar: 'https://generated-image-url.jpg'
            },
            score: 5
          }
        ]
      }
    }

    const nextState = leaderboardsReducer(initialState, action)

    expect(nextState).toEqual(action.payload.leaderboards)
  })
})
