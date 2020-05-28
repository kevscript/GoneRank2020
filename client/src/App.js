import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import GlobalStyle from './styles/global'
import HomePage from './pages/HomePage'
import MatchsPage from './pages/MatchsPage'
import MatchPage from './pages/MatchPage'
import AuthPage from './pages/AuthPage'

const App = () => {
  const [user, setUser] = useState({ id: null, token: null, roles: [] })

  // useEffect(() => {
  //   const id = localStorage.getItem('userId')
  //   const token = localStorage.getItem('token')
  //   const roles = JSON.parse(localStorage.getItem('userRoles'))
  //   setUser({ id, token, roles })
  // }, [])

  const handleUser = ({ id, token, roles }) => {
    setUser({ id: id, token: token, roles: roles })
    localStorage.setItem('token', token)
    localStorage.setItem('userId', id)
    localStorage.setItem('userRoles', JSON.stringify(roles))
  }

  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" user={user} component={HomePage} />
          {!user.id && !user.token && (
            <Route path="/authentication">
              <AuthPage user={user} handleUser={handleUser} />
            </Route>
          )}
          <PrivateRoute path="/matchs" user={user} component={MatchsPage} />
          <PrivateRoute
            path="/match/id/:matchId"
            user={user}
            component={MatchPage}
          />
          <Route render={() => <Redirect to={{ pathname: '/' }} />} />
        </Switch>
        {/* <div>
          <Link to="/">Home</Link>
          <Link to="/authentication">Login</Link>
          <Link to="/matchs">Matchs</Link>
          <Link to="/match/:matchId">Match</Link>
        </div> */}
      </BrowserRouter>
    </div>
  )
}

export default App
