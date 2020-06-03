import React from 'react'
import styled from 'styled-components'
import { NavLink, Switch } from 'react-router-dom'
import AdminRoute from '../routes/AdminRoute'
import SquadPage from './admin/SquadPage'
import FixturesPage from './admin/FixturesPage'

const Container = styled.div`
  width: 100%;
  padding: 60px 0;
`

const Header = styled.div`
  width: 100%;
  height: 60px;
  background: #14387f;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
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
          to="/home/admin/squad"
          activeStyle={{ background: '#d49f45' }}
        >
          Effectif
        </MenuNavLink>
        <MenuNavLink
          to="/home/admin/fixtures"
          activeStyle={{ background: '#d49f45' }}
        >
          Fixtures
        </MenuNavLink>
      </Header>
      <div>
        <Switch>
          <AdminRoute
            path="/home/admin/squad"
            user={user}
            component={SquadPage}
          />
          <AdminRoute
            path="/home/admin/fixtures"
            user={user}
            component={FixturesPage}
          />
        </Switch>
      </div>
    </Container>
  )
}

export default AdminPage
