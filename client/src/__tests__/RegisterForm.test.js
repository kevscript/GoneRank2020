import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import RegisterForm from '../components/auth/RegisterForm'

describe('Register Form', () => {
  let props

  beforeEach(() => {
    props = {
      handleFormStatus: jest.fn(),
      handleRegister: jest.fn(),
    }
    render(<RegisterForm {...props} />)
  })

  test('has email input', () => {
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toBeInTheDocument()
  })

  test('has password input', () => {
    const passwordInput = screen.getByLabelText('mot de passe')
    expect(passwordInput).toBeInTheDocument()
  })

  test('has confirm password input', () => {
    const confirPasswordInput = screen.getByLabelText(/confirmation/i)
    expect(confirPasswordInput).toBeInTheDocument()
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
      const passwordInput = screen.getByLabelText('mot de passe')
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
      const passwordInput = screen.getByLabelText('mot de passe')
      fireEvent.change(passwordInput, {
        target: { value: 'not' },
      })
      fireEvent.blur(passwordInput)
    })
    const passwordError = screen.queryByTestId('password-error')
    expect(passwordError).toBeInTheDocument()
  })

  test('with valid confirm password', async () => {
    // user inputs password
    await act(async () => {
      const passwordInput = screen.getByLabelText('mot de passe')
      fireEvent.change(passwordInput, {
        target: { value: 'imavalidpassword' },
      })
      fireEvent.blur(passwordInput)
    })
    // user inputs confirmation
    await act(async () => {
      const confirmInput = screen.getByLabelText(/confirmation/i)
      fireEvent.change(confirmInput, {
        target: { value: 'imavalidpassword' },
      })
      fireEvent.blur(confirmInput)
    })
    // no error should show up
    const confirmError = screen.queryByTestId('confirm-error')
    expect(confirmError).not.toBeInTheDocument()
  })

  test('with invalid confirm password', async () => {
    // user inputs password
    await act(async () => {
      const passwordInput = screen.getByLabelText('mot de passe')
      fireEvent.change(passwordInput, {
        target: { value: 'imavalidpassword' },
      })
      fireEvent.blur(passwordInput)
    })
    // user inputs bad confirmation
    await act(async () => {
      const confirmInput = screen.getByLabelText(/confirmation/i)
      fireEvent.change(confirmInput, {
        target: { value: 'notsamepassword' },
      })
      fireEvent.blur(confirmInput)
    })
    // error should show up
    const confirmError = screen.queryByTestId('confirm-error')
    expect(confirmError).toBeInTheDocument()
  })

  test('calls handleRegister submit handler when valid inputs are provided', async () => {
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
      const passwordInput = screen.getByLabelText('mot de passe')
      fireEvent.change(passwordInput, {
        target: { value: 'validpassword' },
      })
      fireEvent.blur(passwordInput)
    })
    // user inputs confirmation
    await act(async () => {
      const confirmInput = screen.getByLabelText(/confirmation/i)
      fireEvent.change(confirmInput, {
        target: { value: 'validpassword' },
      })
      fireEvent.blur(confirmInput)
    })
    // user clicks submit
    await act(async () => {
      const submitButton = screen.getByRole('button', { type: 'submit' })
      fireEvent.click(submitButton)
    })

    expect(props.handleRegister).toHaveBeenCalled()
  })

  test('calls handleFormStatus on switch message click', () => {
    const switchMessage = screen.getByText(/se connecter/i)
    fireEvent.click(switchMessage)
    expect(props.handleFormStatus).toHaveBeenCalled()
  })
})
