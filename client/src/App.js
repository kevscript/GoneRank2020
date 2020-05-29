import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import GlobalStyle from './styles/global'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'

const App = () => {
  const [user, setUser] = useState({ id: null, token: null, roles: [] })

  useEffect(() => {
    const hour = 1000 * 60 * 60 // token expiration is set to 1 hour on backend
    const now = new Date().getTime()
    const expireTime = localStorage.getItem('expireTime')
    if (expireTime == null) {
      console.log('no expiration time set')
      return
    }

    if (now - expireTime > hour) {
      console.log('token has expired')
      localStorage.clear()
      return
    } else {
      console.log('token is still valid')
      const user = JSON.parse(localStorage.getItem('user'))
      setUser({ id: user.id, token: user.token, roles: user.roles })
    }
  }, [])

  const handleUser = ({ id, token, roles }) => {
    setUser({ id: id, token: token, roles: roles })
    const user = { id, token, roles }
    localStorage.setItem('user', JSON.stringify(user))
    const newExpireTime = new Date().getTime()
    localStorage.setItem('expireTime', newExpireTime)
  }

  const handleLogout = () => {
    localStorage.clear()
    setUser({ id: null, token: null, roles: [] })
  }

  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <PrivateRoute
            path="/home"
            user={user}
            handleLogout={handleLogout}
            component={HomePage}
          />
          {!user.id && !user.token && (
            <Route path="/authentication">
              <AuthPage user={user} handleUser={handleUser} />
            </Route>
          )}
          <Route render={() => <Redirect to={{ pathname: '/' }} />} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
