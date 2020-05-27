import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user.id ? <Component user={user} {...props} /> : <Redirect to="/" />
      }
    />
  )
}

export default PrivateRoute
