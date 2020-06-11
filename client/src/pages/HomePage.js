import React, { useState } from 'react'
import styled from 'styled-components'
import HomeRouting from '../components/HomeRouting'
import Header from '../components/Header'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`

const RoutingContainer = styled.div`
  padding-top: 90px;
`

const HomePage = ({ user, handleLogout }) => {
  const [editMode, setEditMode] = useState(false)
  const handleEditMode = () => setEditMode((mode) => !mode)

  return (
    <Container>
      <Header
        user={user}
        handleEditMode={handleEditMode}
        handleLogout={handleLogout}
      />
      <RoutingContainer>
        <HomeRouting user={user} editMode={editMode} />
      </RoutingContainer>
    </Container>
  )
}

export default HomePage
