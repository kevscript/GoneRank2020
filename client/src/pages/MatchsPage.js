import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import MatchsList from '../components/MatchsList'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const MatchFormLink = styled(Link)`
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 40px;
  text-transform: uppercase;
  border: 1px solid #dbdbdb;
  background: #f5f5f5;
  color: #14387f;
  font-weight: 600;
  margin: 1rem;
`

const MatchsPage = ({ editMode }) => {
  return (
    <Container>
      {editMode && (
        <MatchFormLink to="/home/matchs/new">Create Match</MatchFormLink>
      )}
      <MatchsList editMode={editMode} />
    </Container>
  )
}

export default MatchsPage
