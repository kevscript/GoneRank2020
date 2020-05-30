import React from 'react'
import styled from 'styled-components'
import { Link, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoute'
import RankingPage from './RankingPage'
import MatchsPage from './MatchsPage'
import MatchPage from './MatchPage'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #14387f;
  padding: 0 1rem;
`

const MenuLink = styled(Link)`
  text-decoration: none;
  padding: 5px;
  color: #f5f5f5;
  font-weight: 600;

  &:not(:first-child) {
    margin-left: 10px;
  }
`

const LogoutButton = styled.button`
  cursor: pointer;
  color: #f5f5f5;
  border: 1px solid #f5f5f5;
  background: transparent;
  padding: 0.5rem 1rem;
  outline: 0;
`

const HomePage = ({ user, handleLogout }) => {
  return (
    <Container>
      <Header>
        <div>
          <MenuLink to="/home/ranking">Ranking</MenuLink>
          <MenuLink to="/home/matchs">Matchs</MenuLink>
        </div>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      <div>
        <Switch>
          <Redirect exact from="/home" to="/home/ranking" />
          <PrivateRoute
            exact
            path="/home/ranking"
            user={user}
            component={RankingPage}
          />
          <PrivateRoute
            exact
            path="/home/matchs"
            user={user}
            component={MatchsPage}
          />
          <PrivateRoute
            path="/home/matchs/id/:matchId"
            user={user}
            component={MatchPage}
          />
        </Switch>
      </div>
    </Container>
  )
}

export default HomePage
