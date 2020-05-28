import React, { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

const AuthPage = ({ handleUser }) => {
  const [isLogin, setIsLogin] = useState(true)
  const handleFormStatus = (bool) => setIsLogin(bool)

  return (
    <div>
      <h3>GoneRank</h3>
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
    </div>
  )
}

export default AuthPage
