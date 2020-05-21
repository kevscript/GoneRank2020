import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = ({ user }) => {
  return (
    <div>
      HomePage
      {user.roles.includes('ADMIN') && <Link to="/admin">Admin</Link>}
    </div>
  )
}

export default HomePage
