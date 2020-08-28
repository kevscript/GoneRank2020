import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN_USER, REGISTER_USER } from '../graphql/queries/auth'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { TransitionWrapper } from '../components/TransitionWrapper'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background: #eff4ff;
`

const Title = styled.h3`
  margin-bottom: 50px;
  font-size: 40px;
  color: #14387f;
`

const FormContainer = styled.div`
  width: 90%;
  max-width: 300px;
`

const MutationError = styled.div`
  font-size: 15px;
  height: 20px;
  color: #da001a;
  font-weight: 300;
`

const AuthPage = ({ handleUser }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [loginError, setLoginError] = useState(null)
  const [registerError, setRegisterError] = useState(null)

  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (res) => {
      setLoginError(null)
      handleUser({
        id: res.login.userId,
        token: res.login.token,
        roles: res.login.roles,
        votes: res.login.votes,
      })
    },
    onError: (err) => {
      setLoginError(err.message)
      console.log(err.graphQLErrors)
    },
  })

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: (res) => {
      setRegisterError(null)
      setIsLogin(true)
    },
    onError: (err) => {
      setRegisterError(err.message)
      console.log(err.graphQLErrors)
    },
  })

  const handleLogin = (formData) => {
    loginUser({
      variables: {
        email: formData.email.toLowerCase(),
        password: formData.password,
      },
    })
  }

  const handleRegister = (formData) => {
    registerUser({
      variables: {
        email: formData.email.toLowercase(),
        password: formData.password,
      },
    })
  }

  const handleFormStatus = (bool) => {
    setLoginError(null)
    setRegisterError(null)
    setIsLogin(bool)
  }

  return (
    <TransitionWrapper>
      <Container>
        <Title>GoneRank</Title>
        <FormContainer>
          {isLogin ? (
            <LoginForm
              handleFormStatus={handleFormStatus}
              handleLogin={handleLogin}
            />
          ) : (
            <RegisterForm
              handleFormStatus={handleFormStatus}
              handleRegister={handleRegister}
            />
          )}
          <MutationError>
            {loginError && <span>{loginError}</span>}
            {registerError && <span>{registerError}</span>}
          </MutationError>
        </FormContainer>
      </Container>
    </TransitionWrapper>
  )
}

export default AuthPage
