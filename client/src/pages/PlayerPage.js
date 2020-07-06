import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_PLAYER } from '../graphql/queries/player'
import Loader from '../components/Loader'

const List = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MatchItem = styled.div`
  text-decoration: none;
  display: flex;
  width: 100%;
  height: 45px;
  background: #fff;
  margin-bottom: 5px;
  border-radius: 5px;
  overflow: hidden;
`

const MatchInfo = styled.div`
  background: #1d3557;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 60px;
`

const MatchData = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`

const MatchDate = styled.span`
  font-size: 10px;
`

const MatchOpponent = styled.div`
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: #1d3557;
  padding-left: 1rem;
`

const PlayerAverage = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  width: 80px;
  height: 100%;
  color: #1d3557;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 2px solid #f5f5f5;
`

const PlayerPage = () => {
  const { playerId } = useParams()
  const { loading, error, data: { player } = {} } = useQuery(GET_PLAYER, {
    variables: {
      id: playerId,
    },
    onCompleted: (data) => console.log(data.player),
  })

  if (loading) return <Loader />
  if (error) return <span>{error.message}</span>

  return (
    <List>
      {player.matches &&
        player.matches.length > 0 &&
        player.matches.map((match) => (
          <MatchItem key={match.id}>
            <MatchInfo>
              <MatchDate>{match.date.slice(0, 5)}</MatchDate>
            </MatchInfo>
            <MatchData>
              <MatchOpponent>{match.opponent}</MatchOpponent>
              <PlayerAverage>{match.lineup[0].average}</PlayerAverage>
            </MatchData>
          </MatchItem>
        ))}
    </List>
  )
}

export default PlayerPage
