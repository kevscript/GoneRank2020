import React, { useState } from 'react'
import styled from 'styled-components'
import LoginForm from '../components/forms/LoginForm'
import RegisterForm from '../components/forms/RegisterForm'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const AuthPage = ({ handleUser }) => {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <Container>
      {isLogin ? (
        <LoginForm setIsLogin={setIsLogin} handleUser={handleUser} />
      ) : (
        <RegisterForm setIsLogin={setIsLogin} />
      )}
    </Container>
  )
}

export default AuthPage
