import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER_USER } from '../../graphql/queries/auth'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 500px;
  max-width: 95%;
`

const FormItem = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 1.5rem 0 0 0;
`

const FormActions = styled.div`
  width: 100%;
  display: flex;
  margin: 1.5em 0;
`

const FormLabel = styled.label`
  margin: 0 0 0.25rem 0.5rem;
`

const FormInput = styled.input`
  padding: 10px 5px;
  width: 300px;
  max-width: 90%;
`

const PrimaryButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px 0 0;
`

const SecondaryButton = styled.button`
  border: 0;
  outline: 0;
  background: transparent;
  cursor: pointer;
  color: blue;
`

const FormError = styled.span`
  font-size: 12px;
  color: red;
  margin: 0.5rem 0 0 0.5rem;
`

const FormHeader = styled.div`
  background: blue;
  padding: 3rem 3rem 1.5rem 3rem;
`

const FormContent = styled.div`
  width: 100%;
  padding: 1.5rem 3rem 3rem 3rem;
`

const FormTitle = styled.h3`
  font-size: 39px;
  color: #f1f1f1;
`

const RegisterForm = ({ setIsLogin }) => {
  const { register, handleSubmit, errors, watch } = useForm()

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: (res) => setIsLogin(true),
    onError: (err) => console.log(err),
  })

  const handleSignUp = (data) => {
    registerUser({ variables: { email: data.email, password: data.password } })
  }

  return (
    <FormContainer onSubmit={(e) => e.preventDefault()}>
      <FormHeader>
        <FormTitle>SIGNUP</FormTitle>
      </FormHeader>
      <FormContent>
        <FormItem>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            type="text"
            name="email"
            ref={register({
              required: 'You must specify an email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            type="password"
            name="password"
            ref={register({
              required: 'You must specify a password',
              minLength: {
                value: 7,
                message: 'Password must have at least 7 characters',
              },
            })}
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="confirmedPassword">Confirm Password</FormLabel>
          <FormInput
            type="password"
            name="confirmedPassword"
            ref={register({
              validate: (value) =>
                value === watch('password') || 'The passwords do not match',
            })}
          />
          {errors.confirmedPassword && (
            <FormError>{errors.confirmedPassword.message}</FormError>
          )}
        </FormItem>
        <FormActions>
          <PrimaryButton type="submit" onClick={handleSubmit(handleSignUp)}>
            Sign Up
          </PrimaryButton>
          <SecondaryButton onClick={() => setIsLogin(true)}>
            Login
          </SecondaryButton>
        </FormActions>
      </FormContent>
    </FormContainer>
  )
}

export default RegisterForm
