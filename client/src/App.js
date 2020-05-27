import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import HomePage from './pages/HomePage'
import MatchsPage from './pages/MatchsPage'
import MatchPage from './pages/MatchPage'
import AuthPage from './pages/AuthPage'

const App = () => {
  const [user, setUser] = useState({ id: null, token: null, roles: [] })

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <HomePage user={user} />
          </Route>
          <Route path="/authentication">
            <AuthPage user={user} />
          </Route>
          <PrivateRoute path="/matchs" user={user} component={<MatchsPage />} />
          <PrivateRoute
            path="/match/id/:matchId"
            user={user}
            component={<MatchPage />}
          />
          <Route render={() => <Redirect to={{ pathname: '/' }} />} />
        </Switch>
        <div>
          <Link to="/">Home</Link>
          <Link to="/authentication">Login</Link>
          <Link to="/matchs">Matchs</Link>
          <Link to="/match/:matchId">Match</Link>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
