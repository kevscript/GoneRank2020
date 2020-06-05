import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, NavLink, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from '../routes/PrivateRoute'
import AdminRoute from '../routes/AdminRoute'
import RankingPage from './RankingPage'
import MatchsPage from './MatchsPage'
import MatchPage from './MatchPage'
import AdminPage from './AdminPage'
import EditIcon from '../assets/edit.svg'
import UserIcon from '../assets/user.svg'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`

const Header = styled.div`
  width: 100%;
`

const Menu = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`

const MenuLink = styled(Link)`
  text-decoration: none;
  color: #14387f;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
`

const IconContainer = styled.div`
  width: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const Icon = styled.img`
  display: block;
  width: 100%;
  height: auto;
`

const Navigation = styled.div`
  width: 100%;
  display: flex;
`

const NaviLink = styled(NavLink)`
  text-decoration: none;
  color: #dbdbdb;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  font-weight: 600;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #dbdbdb;
`

const HomePage = ({ user, handleLogout }) => {
  const [editMode, setEditMode] = useState(false)
  const handleEditMode = () => setEditMode((mode) => !mode)

  return (
    <Container>
      <Header>
        <Menu>
          {user.roles.includes('ADMIN') && (
            <IconContainer onClick={handleEditMode}>
              <Icon src={EditIcon} alt="edit mode button" />
            </IconContainer>
          )}
          <MenuLink to="/home">gonerank</MenuLink>
          <IconContainer onClick={handleLogout}>
            <Icon src={UserIcon} alt="logout button" />
          </IconContainer>
        </Menu>
        <Navigation>
          <NaviLink
            to="/home/ranking"
            activeStyle={{
              color: '#333',
              borderBottom: '2px solid #14387f',
            }}
          >
            Players
          </NaviLink>
          <NaviLink
            to="/home/matchs"
            activeStyle={{
              color: '#333',
              borderBottom: '2px solid #14387f',
            }}
          >
            Matches
          </NaviLink>
        </Navigation>
      </Header>
      <div>
        <Switch>
          <Redirect exact from="/home" to="/home/ranking" />
          <PrivateRoute
            exact
            path="/home/ranking"
            user={user}
            editMode={editMode}
            component={RankingPage}
          />
          <PrivateRoute
            exact
            path="/home/matchs"
            user={user}
            editMode={editMode}
            component={MatchsPage}
          />
          <PrivateRoute
            path="/home/matchs/id/:matchId"
            user={user}
            editMode={editMode}
            component={MatchPage}
          />
        </Switch>
      </div>
    </Container>
  )
}

export default HomePage
