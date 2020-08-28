import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_MATCH } from '../graphql/queries/match'
import { GET_PLAYERS } from '../graphql/queries/player'
import Loader from '../components/Loader'
import LineupList from '../components/LineupList'
import LineupEdit from '../components/LineupEdit'
import { TransitionWrapper } from '../components/TransitionWrapper'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`

const MatchPage = ({ user, editMode }) => {
  const { matchId } = useParams()
  const { loading, error, data: { match } = {} } = useQuery(GET_MATCH, {
    skip: !matchId,
    variables: { id: matchId },
  })
  const { data: { players } = {} } = useQuery(GET_PLAYERS, {
    skip: !editMode,
  })
  const userHasVoted =
    user.votes.findIndex((vote) => vote.matchId === matchId) === -1
      ? false
      : true

  if (loading) return <Loader />
  if (error) return <p>{error.message}</p>

  return (
    <TransitionWrapper>
      <Container>
        {editMode ? (
          <LineupEdit match={match} user={user} players={players} />
        ) : (
          <LineupList match={match} user={user} userHasVoted={userHasVoted} />
        )}
      </Container>
    </TransitionWrapper>
  )
}

export default MatchPage
