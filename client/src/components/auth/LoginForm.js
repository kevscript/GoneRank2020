import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN_USER } from '../../graphql/queries/auth'

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
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="email">email</label>
        <input
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
        {errors.email && errors.email.message}
      </div>
      <div>
        <label htmlFor="password">mot de passe</label>
        <input
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
        {errors.password && errors.password.message}
      </div>
      <button type="submit" onClick={handleSubmit(handleLogin)}>
        se connecter
      </button>
      <p>
        Pas encore de compte?{' '}
        <span onClick={() => handleFormStatus(false)}>S'inscrire</span>.
      </p>
    </form>
  )
}

export default LoginForm
