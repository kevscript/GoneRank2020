import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute = ({ component: Component, user, ...rest }) => {
  console.log(user)
  return (
    <Route
      {...rest}
      render={(props) =>
        user.roles.includes('ADMIN') ? (
          <Component user={user} {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}

export default AdminRoute
