/**
 * Test scenario
 *
 * - FormLogin Component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 *
 */

import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import FormLogin from './FormLogin'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

describe('FormLogin Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should handle email typing correctly', async () => {
    render(<FormLogin login={() => {}}/>)
    const emailInput = await screen.getByPlaceholderText('Email')

    await userEvent.type(emailInput, 'example@mail.com')

    expect(emailInput).toHaveValue('example@mail.com')
  })

  it('should handle password typing correctly', async () => {
    render(<FormLogin login={() => {}}/>)
    const passwordInput = await screen.getByPlaceholderText('Password')

    await userEvent.type(passwordInput, 'passwordtest')

    expect(passwordInput).toHaveValue('passwordtest')
  })

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn()
    render(<FormLogin login={mockLogin} />)
    const emailInput = await screen.getByPlaceholderText('Email')
    await userEvent.type(emailInput, 'example@mail.com')
    const passwordInput = await screen.getByPlaceholderText('Password')
    await userEvent.type(passwordInput, 'passwordtest')
    const loginButton = await screen.getByRole('button', { name: 'Login' })

    await userEvent.click(loginButton)

    expect(mockLogin).toBeCalledWith({
      email: 'example@mail.com',
      password: 'passwordtest'
    })
  })
})
