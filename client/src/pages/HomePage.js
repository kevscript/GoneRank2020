import React from 'react'
import styled from 'styled-components'
import { NavLink, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoute'
import RankingPage from './RankingPage'
import MatchsPage from './MatchsPage'
import MatchPage from './MatchPage'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #14387f;
  padding: 0 1rem;
  position: fixed;
  bottom: 0;
`

const MenuNavLink = styled(NavLink)`
  text-decoration: none;
  padding: 15px;
  color: #f5f5f5;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NavContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
        <Menu>
          <NavContainer>
            <MenuNavLink
              to="/home/ranking"
              activeStyle={{ background: '#da001a' }}
            >
              Ranking
            </MenuNavLink>
            <MenuNavLink
              to="/home/matchs"
              activeStyle={{ background: '#da001a' }}
            >
              Matchs
            </MenuNavLink>
          </NavContainer>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Menu>
      </div>
    </Container>
  )
}

export default HomePage
