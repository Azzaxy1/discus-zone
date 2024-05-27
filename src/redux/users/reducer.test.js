/**
 * test scenario for usersReducer
 *
 * - usersReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the users when given by RECEIVE_USERS action
 *
 */

import { describe, it, expect } from 'vitest'
import { ActionType } from './action'
import { usersReducer } from './reducer'

describe('usersReducer Function', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = []
    const action = { type: 'UNKNOWN' }

    const nextState = usersReducer(initialState, action)

    expect(nextState).toEqual(initialState)
  })
  it('should return the users when given by RECEIVE_USERS action', () => {
    const initialState = []
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: [
          {
            id: 'users-1',
            name: 'Name 1',
            email: 'name1@example.com',
            avatar: 'https://generated-image-url.jpg'
          },
          {
            id: 'users-2',
            name: 'Name 2',
            email: 'name2@example.com',
            avatar: 'https://generated-image-url.jpg'
          }
        ]
      }
    }

    const nextState = usersReducer(initialState, action)

    expect(nextState).toEqual(action.payload.users)
  })
})
