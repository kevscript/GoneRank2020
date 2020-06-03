import React from 'react'
import styled from 'styled-components'
import { Switch } from 'react-router-dom'
import AdminRoute from '../../routes/AdminRoute'
import AdminMatchsPage from './AdminMatchsPage'
import AdminMatchPage from './AdminMatchPage'
import NewMatchPage from './NewMatchPage'

const Container = styled.div`
  width: 100%;
  padding-bottom: 60px;
`

const FixturesPage = ({ user }) => {
  return (
    <Container>
      <Switch>
        <AdminRoute
          exact
          path="/home/admin/fixtures"
          user={user}
          component={AdminMatchsPage}
        />
        <AdminRoute
          path="/home/admin/fixtures/id/:matchId"
          user={user}
          component={AdminMatchPage}
        />
        <AdminRoute
          path="/home/admin/fixtures/new"
          user={user}
          component={NewMatchPage}
        />
      </Switch>
    </Container>
  )
}

export default FixturesPage
