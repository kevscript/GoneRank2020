import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PrivateRoute from './routes/PrivateRoute'
import GlobalStyle from './styles/global'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
`

const App = () => {
  const [user, setUser] = useState({
    id: null,
    token: null,
    roles: [],
    votes: null,
  })

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
      setUser({
        id: user.id,
        token: user.token,
        roles: user.roles,
        votes: user.votes,
      })
    }
  }, [])

  const handleUser = ({ id, token, roles, votes }) => {
    setUser({ id: id, token: token, roles: roles, votes: votes })
    const user = { id, token, roles, votes }
    localStorage.setItem('user', JSON.stringify(user))
    const newExpireTime = new Date().getTime()
    localStorage.setItem('expireTime', newExpireTime)
  }

  const handleLogout = () => {
    localStorage.clear()
    setUser({ id: null, token: null, roles: [], votes: null })
  }

  return (
    <Container>
      <GlobalStyle />
      <BrowserRouter>
        <AnimatePresence>
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
        </AnimatePresence>
      </BrowserRouter>
    </Container>
  )
}

export default App
