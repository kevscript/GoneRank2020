import React, { useState } from 'react'
import styled from 'styled-components'
import HomeRouting from '../components/HomeRouting'
import Header from '../components/Header'
import { TransitionWrapper } from '../components/TransitionWrapper'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
`

const RoutingContainer = styled.div`
  padding-top: 90px;
  background: #f5f5f5;
`

const HomePage = ({ user, handleLogout }) => {
  const [editMode, setEditMode] = useState(false)
  const handleEditMode = () => setEditMode((mode) => !mode)

  return (
    <TransitionWrapper>
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
    </TransitionWrapper>
  )
}

export default HomePage
