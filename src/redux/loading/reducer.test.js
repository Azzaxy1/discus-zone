/**
 * test scenario for isLoadingReducer
 *
 * - isLoadingReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the isloading when given by SET_IS_LOADING action
 *  - should return the current state when given SET_IS_LOADING action without payload
 *
 */

import { describe, it, expect } from 'vitest'
import { ActionType } from './action'
import isLoadingReducer from './reducer'

describe('isLoadingReducer Function', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = true
    const action = { type: 'UNKNOWN' }

    const nextState = isLoadingReducer(initialState, action)

    expect(nextState).toEqual(initialState)
  })
  it('should return the isloading when given by SET_IS_LOADING action', () => {
    const initialState = true
    const action = {
      type: ActionType.SET_IS_LOADING,
      payload: {
        isLoading: false
      }
    }

    const nextState = isLoadingReducer(initialState, action)

    expect(nextState).toEqual(action.payload.isLoading)
  })
})
