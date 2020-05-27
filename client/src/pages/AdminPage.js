import React from 'react'
import styled from 'styled-components'
import { Switch, Link } from 'react-router-dom'
import AdminRoute from '../routes/AdminRoute'
import PlayersPage from './PlayersPage'
import MatchesPage from './MatchesPage'

const Container = styled.div``

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
  &:hover {
    color: red;
  }
`

const AdminPage = ({ user }) => {
  return (
    <Container>
      <Header>
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink to="/admin/players">Players</HeaderLink>
        <HeaderLink to="/admin/matches/new">Matches</HeaderLink>
      </Header>
      <Switch>
        <AdminRoute path="/admin/players" user={user} component={PlayersPage} />
        <AdminRoute path="/admin/matches" user={user} component={MatchesPage} />
      </Switch>
    </Container>
  )
}

export default AdminPage
