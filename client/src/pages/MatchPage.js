import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_MATCH } from '../graphql/queries/match'
import Loader from '../components/Loader'
import LineupList from '../components/LineupList'
import LineupEdit from '../components/LineupEdit'

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

  if (!matchId) return <p>No matching Id</p>
  if (loading) return <Loader />
  if (error) return <p>{error.message}</p>

  return (
    <Container>
      {editMode ? (
        <LineupEdit match={match} user={user} />
      ) : (
        <LineupList match={match} user={user} />
      )}
    </Container>
  )
}

export default MatchPage
