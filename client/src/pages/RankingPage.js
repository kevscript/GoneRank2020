import React from 'react'
import styled from 'styled-components'
import PlayerForm from '../components/PlayerForm'
import PlayersList from '../components/PlayersList'

const Container = styled.div`
  width: 100%;
  background: #fff;
`

const RankingPage = ({ editMode }) => {
  return (
    <Container>
      {editMode && <PlayerForm />}
      <PlayersList editMode={editMode} />
    </Container>
  )
}

export default RankingPage
