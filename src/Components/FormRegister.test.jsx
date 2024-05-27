/**
 * Test scenario
 *
 * - FormRegister Component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 *
 */

import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import FormRegister from './FormRegister'

expect.extend(matchers)

describe('FormRegister Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should handle name typing correctly', async () => {
    render(<FormRegister register={() => {}}/>)
    const nameInput = await screen.getByPlaceholderText('Username')

    await userEvent.type(nameInput, 'example')

    expect(nameInput).toHaveValue('example')
  })

  it('should handle email typing correctly', async () => {
    render(<FormRegister register={() => {}}/>)
    const emailInput = await screen.getByPlaceholderText('Email')

    await userEvent.type(emailInput, 'example@mail.com')

    expect(emailInput).toHaveValue('example@mail.com')
  })

  it('should handle password typing correctly', async () => {
    render(<FormRegister register={() => {}}/>)
    const passwordInput = await screen.getByPlaceholderText('Password')

    await userEvent.type(passwordInput, 'passwordtest')

    expect(passwordInput).toHaveValue('passwordtest')
  })

  it('should call register function when register button is clicked', async () => {
    const mockRegister = vi.fn()
    render(<FormRegister register={mockRegister} />)
    const nameInput = await screen.getByPlaceholderText('Username')
    await userEvent.type(nameInput, 'example')
    const emailInput = await screen.getByPlaceholderText('Email')
    await userEvent.type(emailInput, 'example@mail.com')
    const passwordInput = await screen.getByPlaceholderText('Password')
    await userEvent.type(passwordInput, 'passwordtest')
    const registerButton = await screen.getByRole('button', { name: 'Register' })

    await userEvent.click(registerButton)

    expect(mockRegister).toBeCalledWith({
      name: 'example',
      email: 'example@mail.com',
      password: 'passwordtest'
    })
  })
})
