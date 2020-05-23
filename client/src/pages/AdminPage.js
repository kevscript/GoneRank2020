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
  background: rgba(20, 56, 127, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 1);
`

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 1.5rem;

  &:hover {
    color: red;
  }
`

const AdminPage = ({ user }) => {
  return (
    <Container>
      <Header>
        <HeaderLink to="/admin/players">Players</HeaderLink>
        <HeaderLink to="/admin/matches">Matches</HeaderLink>
      </Header>
      <Switch>
        <AdminRoute path="/admin/players" user={user} component={PlayersPage} />
        <AdminRoute path="/admin/matches" user={user} component={MatchesPage} />
      </Switch>
    </Container>
  )
}

export default AdminPage
