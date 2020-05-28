import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER_USER } from '../../graphql/queries/auth'

const RegisterForm = ({ handleFormStatus }) => {
  const { register, handleSubmit, errors, watch } = useForm()

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: (res) => handleFormStatus(true),
    onError: (err) => console.error(err),
  })

  const handleRegister = (formData) => {
    registerUser({
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
            required: 'Veuiller entrer un email.',
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
      <div>
        <label htmlFor="confirmPassword">confirmation du mot de passe</label>
        <input
          type="password"
          name="confirmPassword"
          ref={register({
            required: 'Veuillez confirmer le mot de passe.',
            validate: (value) =>
              value === watch('password') || 'Mot de passe différent.',
          })}
        />
        {errors.confirmPassword && errors.confirmPassword.message}
      </div>
      <button type="submit" onClick={handleSubmit(handleRegister)}>
        s'inscrire
      </button>
      <p>
        Tu as déjà un compte?{' '}
        <span onClick={() => handleFormStatus(true)}>Se connecter</span>.
      </p>
    </form>
  )
}

export default RegisterForm
