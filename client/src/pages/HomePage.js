import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Link } from 'react-router-dom'

const Header = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const HeaderLink = styled(Link)`
  text-decoration: none;
  margin: 0 1rem;
  color: inherit;
`

const HomePage = ({ user }) => {
  return (
    <div>
      <Header>
        <HeaderLink to="/home">Home</HeaderLink>
        <HeaderLink to="/home/ranking">Ranking</HeaderLink>
        <HeaderLink to="/home/matches">Matches</HeaderLink>
        {user.roles.includes('ADMIN') && (
          <HeaderLink to="/admin">Admin</HeaderLink>
        )}
      </Header>
      <Switch>
        <Route exact path="/home">
          <div>Default Route</div>
        </Route>
        <Route path="/home/ranking">
          <div>Ranking</div>
        </Route>
        <Route path="/home/matches">
          <div>Matches</div>
        </Route>
      </Switch>
    </div>
  )
}

export default HomePage
