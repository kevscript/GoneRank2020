import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import AdminRoute from './routes/AdminRoute'
import GlobalStyle from './styles/global'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import AdminPage from './pages/AdminPage'

const App = () => {
  const [user, setUser] = useState({ id: null, token: null, roles: [] })
  const handleUser = (id, token, roles) => {
    setUser({ id: id, token: token, roles: roles })
    localStorage.setItem('token', token)
    localStorage.setItem('userId', id)
    localStorage.setItem('userRoles', JSON.stringify(roles))
  }

  useEffect(() => {
    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const roles = JSON.parse(localStorage.getItem('userRoles'))
    setUser({ id, token, roles })
  }, [])

  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" user={user} component={HomePage} />
          <AdminRoute path="/admin" user={user} component={AdminPage} />
          <Route path="/authentication">
            {user.token && user.id ? (
              <Redirect to="/" />
            ) : (
              <AuthPage handleUser={handleUser} />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
