/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return initial state when given an unknown action
 *  - should return the authUser when given LOGIN_SUCCESS action
 *  - should return null when given LOGOUT_SUCCESS action
 *
 */

import { describe, expect, it } from 'vitest'
import { authUserReducer } from './reducer'
import { ActionType } from './action'

describe('authUserReducer function', () => {
  it('should return initial state when given an unknown action', () => {
    const initialState = null
    const action = { type: 'UNKNOWN' }

    const nextState = authUserReducer(initialState, action)

    expect(nextState).toEqual(initialState)
  })
  it('should return the authUser when given LOGIN_SUCCESS action', () => {
    const initialState = null
    const action = {
      type: ActionType.LOGIN_SUCCESS,
      payload: {
        authUser: {
          id: 'user_1',
          name: 'Name 1',
          email: 'name1@example.com',
          avatar: 'https://generated-image-url.jpg'
        }
      }
    }

    const nextState = authUserReducer(initialState, action)

    expect(nextState).toEqual(action.payload.authUser)
  })
  it('should return null when given LOGOUT_SUCCESS action', () => {
    const initialState = {
      id: 'user_1',
      name: 'Name 1',
      email: 'name1@example.com',
      avatar: 'https://generated-image-url.jpg'
    }
    const action = {
      type: ActionType.LOGOUT_SUCCESS,
      payload: null
    }

    const nextState = authUserReducer(initialState, action)

    expect(nextState).toEqual(action.payload)
  })
})
