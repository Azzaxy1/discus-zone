/**
 * test scenario for LeaderboardItem
 *
 * - LeaderboardItem component
 *  - should render correctly with provided props
 *  - should throw PropTypes validation error if required props are missing
 *  - should render different data dynamically
 *
  */
import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LeaderboardItem from './LeaderboardItem'

describe('LeaderboardItem Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render correctly with provided props', () => {
    const mockProps = {
      name: 'Name 1',
      score: 10,
      avatar: 'https://generated-image-url.jpg/'
    }

    render(<LeaderboardItem {...mockProps} />)

    expect(screen.getByText(mockProps.name)).toBeTruthy()
    expect(screen.getByText(mockProps.score)).toBeTruthy()
    expect(screen.getByRole('img')).toHaveProperty('src', mockProps.avatar)
  })

  it('should throw PropTypes validation error if required props are missing', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(<LeaderboardItem />)

    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('should render different data dynamically', () => {
    const firstData = {
      name: 'Name 1',
      score: 10,
      avatar: 'https://generated-image-url.jpg/'
    }
    const secondData = {
      name: 'Name 2',
      score: 20,
      avatar: 'https://generated-image-url.jpg/'
    }

    render(
      <>
        <LeaderboardItem {...firstData} />
        <LeaderboardItem {...secondData} />
      </>
    )

    expect(screen.getByText(firstData.name)).toBeTruthy()
    expect(screen.getByText(secondData.name)).toBeTruthy()
  })
})
