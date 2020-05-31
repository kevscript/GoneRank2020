import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_MATCHES } from '../graphql/queries/match'
import { sortMatchesByDate } from '../utils/sortMatchesByDate'

const Container = styled.div`
  width: 100%;
`

const MatchsList = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MatchItem = styled(Link)`
  text-decoration: none;
  display: flex;
  width: 100%;
  height: 50px;
  background: #f5f5f5;
  margin-bottom: 5px;
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
  padding: 0 0 0 1rem;
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

const MatchRating = styled.div`
  background: #14387f;
  width: 60px;
  height: 100%;
  color: #fff;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MatchsPage = ({ user }) => {
  const { loading, error, data: { matches } = {} } = useQuery(GET_MATCHES, {
    onCompleted: (res) => console.log(res),
  })

  if (loading) return <h1>Loading....</h1>
  if (error) return <p>{error.message}</p>
  return (
    <Container>
      <MatchsList>
        {matches &&
          sortMatchesByDate(matches).map((match) => (
            <MatchItem to={`/home/matchs/id/${match.id}`} key={match.id}>
              <MatchInfo>
                <MatchLocation>
                  {match.location === 'home' ? 'H' : 'A'}
                </MatchLocation>
                <MatchDate>{match.date.slice(0, 5)}</MatchDate>
              </MatchInfo>
              <MatchData>
                <MatchOpponent>{match.opponent}</MatchOpponent>
                <MatchRating>5</MatchRating>
              </MatchData>
            </MatchItem>
          ))}
      </MatchsList>
    </Container>
  )
}

export default MatchsPage
