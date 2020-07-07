import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_PLAYER } from '../graphql/queries/player'
import Loader from '../components/Loader'

const Container = styled.div`
  padding: 0 1rem;
  width: 100%;
  margin: 0 auto;
  max-width: 800px;
`

const List = styled.div`
  width: 100%;
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
  color: #1d3557;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 80px;
  border-right: 2px solid #f5f5f5;
`

const MatchData = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: 100%;
  text-decoration: none;
  padding-left: 1rem;
  color: #14387f;
`

const MatchDate = styled.span`
  font-size: 10px;
`

const MatchOpponent = styled.span`
  display: flex;
  align-items: center;
  color: #1d3557;
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

const TitleBar = styled.li`
  display: flex;
  width: 100%;
  height: 45px;
  background: #fff;
  margin-bottom: 5px;
  border-radius: 5px;
  overflow: hidden;
  margin: 1rem 0;
`

const TitleMain = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: 100%;
  text-decoration: none;
  padding-left: 1rem;
  color: #1d3557;
`

const TitleText = styled.span`
  font-weight: 600;
`

const TitleRating = styled.div`
  font-size: 10px;
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1d3557;
  color: #fff;
  border-left: 2px solid #f5f5f5;
`

const TitleInfo = styled.div`
  border-right: 2px solid #f5f5f5;
  background: #1d3557;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 80px;
  font-size: 10px;
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
    <Container>
      <TitleBar>
        <TitleInfo>{player.matchesPlayed.length}m.</TitleInfo>
        <TitleMain>
          <TitleText>Matchs de {player.lastName}</TitleText>
        </TitleMain>
        <TitleRating>Note/10</TitleRating>
      </TitleBar>
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
              </MatchData>
              <PlayerAverage>{match.lineup[0].average}</PlayerAverage>
            </MatchItem>
          ))}
      </List>
    </Container>
  )
}

export default PlayerPage
