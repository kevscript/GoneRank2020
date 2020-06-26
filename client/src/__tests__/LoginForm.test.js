import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import LoginForm from '../components/auth/LoginForm'

describe('Login Form', () => {
  let props

  beforeEach(() => {
    props = {
      handleFormStatus: jest.fn(),
      handleLogin: jest.fn(),
    }
    render(<LoginForm {...props} />)
  })

  test('has email input', () => {
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toBeInTheDocument()
  })

  test('has password input', () => {
    const passwordInput = screen.getByLabelText(/mot de passe/i)
    expect(passwordInput).toBeInTheDocument()
  })

  test('with valid email', async () => {
    await act(async () => {
      const emailInput = screen.getByLabelText(/email/i)
      fireEvent.change(emailInput, {
        target: { value: 'validemail@email.com' },
      })
      fireEvent.blur(emailInput)
    })
    const emailError = screen.queryByTestId('email-error')
    expect(emailError).not.toBeInTheDocument()
  })

  test('with invalid email', async () => {
    await act(async () => {
      const emailInput = screen.getByLabelText(/email/i)
      fireEvent.change(emailInput, {
        target: { value: 'notvalid' },
      })
      fireEvent.blur(emailInput)
    })
    const emailError = screen.queryByTestId('email-error')
    expect(emailError).toBeInTheDocument()
  })

  test('with valid password', async () => {
    await act(async () => {
      const passwordInput = screen.getByLabelText(/mot de passe/i)
      fireEvent.change(passwordInput, {
        target: { value: 'imavalidpassword' },
      })
      fireEvent.blur(passwordInput)
    })
    const passwordError = screen.queryByTestId('password-error')
    expect(passwordError).not.toBeInTheDocument()
  })

  test('with invalid password', async () => {
    await act(async () => {
      const passwordInput = screen.getByLabelText(/mot de passe/i)
      fireEvent.change(passwordInput, {
        target: { value: 'not' },
      })
      fireEvent.blur(passwordInput)
    })
    const passwordError = screen.queryByTestId('password-error')
    expect(passwordError).toBeInTheDocument()
  })

  test('calls handleLogin submit handler when valid inputs are provided', async () => {
    // user inputs his email
    await act(async () => {
      const emailInput = screen.getByLabelText(/email/i)
      fireEvent.change(emailInput, {
        target: { value: 'valid@email.com' },
      })
      fireEvent.blur(emailInput)
    })
    // user inputs his password
    await act(async () => {
      const passwordInput = screen.getByLabelText(/mot de passe/i)
      fireEvent.change(passwordInput, {
        target: { value: 'validpassword' },
      })
      fireEvent.blur(passwordInput)
    })
    // user clicks submit
    await act(async () => {
      const submitButton = screen.getByRole('button', { type: 'submit' })
      fireEvent.click(submitButton)
    })

    expect(props.handleLogin).toHaveBeenCalled()
  })

  test('calls handleFormStatus on switch message click', () => {
    const switchMessage = screen.getByText(/s'inscrire/i)
    fireEvent.click(switchMessage)
    expect(props.handleFormStatus).toHaveBeenCalled()
  })
})
