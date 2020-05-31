import React, { useState } from 'react'
import styled from 'styled-components'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: #eff4ff;
`

const Title = styled.h3`
  margin-top: 50px;
  font-size: 40px;
  color: #14387f;
`

const FormContainer = styled.div`
  width: 90%;
  max-width: 300px;
  position: fixed;
  bottom: 50px;
`

const AuthPage = ({ handleUser }) => {
  const [isLogin, setIsLogin] = useState(true)
  const handleFormStatus = (bool) => setIsLogin(bool)

  return (
    <Container>
      <Title>GoneRank</Title>
      <FormContainer>
        {isLogin ? (
          <LoginForm
            handleFormStatus={handleFormStatus}
            handleUser={handleUser}
          />
        ) : (
          <RegisterForm
            handleFormStatus={handleFormStatus}
            handleUser={handleUser}
          />
        )}
      </FormContainer>
    </Container>
  )
}

export default AuthPage
