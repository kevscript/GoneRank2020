import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN_USER } from '../../graphql/queries/auth'

const Form = styled.form`
  width: 100%;
`

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

const FormLabel = styled.label`
  margin-left: 1rem;
  color: #14387f;
  font-weight: 600;
`

const FormInput = styled.input`
  height: 50px;
  border: none;
  outline: none;
  border-bottom: 4px solid #14387f;
  margin-top: 5px;
  padding: 0 1rem;
  transition: all 0.1s ease-out;
  font-size: 1rem;

  &:focus {
    transition: all 0.1s ease-out;
    outline: 2px solid #14387f;
    border-bottom: 2px solid #14387f;
  }
`

const FormError = styled.div`
  margin-top: 5px;
  margin-left: 1rem;
  height: 20px;
  display: flex;
  align-items: center;
  color: #da001a;
  font-weight: 300;
`

const FormButton = styled.button`
  cursor: pointer;
  width: 160px;
  height: 50px;
  background: #fff;
  border: 1px solid #14387f;
  text-transform: uppercase;
  color: #14387f;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #14387f;
    color: #f5f5f5;
  }
`

const Message = styled.p`
  color: #444;

  span {
    color: #14387f;
    cursor: pointer;
    padding-bottom: 1px;
    border-bottom: 1px solid #14387f;
  }
`

const LoginForm = ({ handleFormStatus, handleUser }) => {
  const { register, handleSubmit, errors } = useForm()

  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (res) =>
      handleUser({
        id: res.login.userId,
        token: res.login.token,
        roles: res.login.roles,
      }),
    onError: (err) => console.error(err),
  })

  const handleLogin = (formData) => {
    loginUser({
      variables: {
        email: formData.email,
        password: formData.password,
      },
    })
  }

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormItem>
        <FormLabel htmlFor="email">email</FormLabel>
        <FormInput
          type="text"
          name="email"
          ref={register({
            required: 'Veuillez entrer un email.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: `L'email n'est pas valide.`,
            },
          })}
        />
        <FormError>{errors.email ? errors.email.message : null}</FormError>
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="password">mot de passe</FormLabel>
        <FormInput
          type="password"
          name="password"
          ref={register({
            required: 'Veuillez entrer un mot de passe.',
            minLength: {
              value: 7,
              message: 'Mot de passe à 7 caractères minimum.',
            },
          })}
        />
        <FormError>
          {errors.password ? errors.password.message : null}
        </FormError>
      </FormItem>
      <FormButton type="submit" onClick={handleSubmit(handleLogin)}>
        se connecter
      </FormButton>
      <Message>
        Pas encore de compte?{' '}
        <span onClick={() => handleFormStatus(false)}>S'inscrire</span>.
      </Message>
    </Form>
  )
}

export default LoginForm
