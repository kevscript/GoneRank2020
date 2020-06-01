import React from 'react'
import styled from 'styled-components'
import { NavLink, Switch } from 'react-router-dom'
import AdminRoute from '../routes/AdminRoute'
import PlayersPage from './admin/PlayersPage'

const Container = styled.div`
  width: 100%;
`

const Header = styled.div`
  width: 100%;
  height: 40px;
  background: #14387f;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuNavLink = styled(NavLink)`
  text-decoration: none;
  color: #f5f5f5;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AdminPage = ({ user }) => {
  return (
    <Container>
      <Header>
        <MenuNavLink
          to="/home/admin/players"
          activeStyle={{ background: '#d49f45', color: '#14387f' }}
        >
          Joueurs
        </MenuNavLink>
        <MenuNavLink
          to="/home/admin/matchs"
          activeStyle={{ background: '#d49f45', color: '#14387f' }}
        >
          Matchs
        </MenuNavLink>
      </Header>
      <div>
        <Switch>
          <AdminRoute
            path="/home/admin/players"
            user={user}
            component={PlayersPage}
          />
          <AdminRoute
            path="/home/admin/matchs"
            user={user}
            component={() => <div>Matchs</div>}
          />
        </Switch>
      </div>
    </Container>
  )
}

export default AdminPage
