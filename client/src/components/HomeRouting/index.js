import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import PrivateRoute from '../../routes/PrivateRoute'
import AdminRoute from '../../routes/AdminRoute'
import RankingPage from '../../pages/RankingPage'
import MatchsPage from '../../pages/MatchsPage'
import MatchPage from '../../pages/MatchPage'
import NewMatchPage from '../../pages/NewMatchPage'

const HomeRouting = ({ user, editMode }) => {
  return (
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
      <AdminRoute
        path="/home/matchs/new"
        user={user}
        editMode={editMode}
        component={NewMatchPage}
      />
    </Switch>
  )
}

HomeRouting.propTypes = {
  user: PropTypes.object,
  editMode: PropTypes.bool,
}

export default HomeRouting
