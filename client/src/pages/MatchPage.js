import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_MATCH } from '../graphql/queries/match'

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MatchItem = styled.div`
  text-decoration: none;
  width: 100%;
  display: flex;
  height: 50px;
  background: #f5f5f5;
`

const MatchInfo = styled.div`
  background: #dbdbdb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #14387f;
  width: 50px;
`

const MatchData = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`

const MatchLocation = styled.div`
  font-size: 10px;
`
const MatchDate = styled.span`
  font-size: 10px;
`
const MatchOpponent = styled.span`
  color: #14387f;
`

const MatchRating = styled.span`
  color: #14387f;
  font-size: 10px;
`

const MatchPage = () => {
  const { matchId } = useParams()
  const { loading, error, data: { match } = {} } = useQuery(GET_MATCH, {
    skip: !matchId,
    variables: { id: matchId },
    onCompleted: (res) => console.log(res),
  })

  if (!matchId) return <p>No match Id</p>
  if (loading) return <h1>Loading...</h1>
  if (error) return <p>{error.message}</p>

  return (
    <Container>
      <MatchItem>
        <MatchInfo>
          <MatchLocation>{match.location === 'home' ? 'H' : 'A'}</MatchLocation>
          <MatchDate>{match.date.slice(0, 5)}</MatchDate>
        </MatchInfo>
        <MatchData>
          <MatchOpponent>{match.opponent}</MatchOpponent>
          <MatchRating>Note / 10</MatchRating>
        </MatchData>
      </MatchItem>
      <div>Players Form</div>
    </Container>
  )
}

export default MatchPage
