import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_PLAYER } from '../graphql/queries/player'
import Loader from '../components/Loader'
import { sortMatchesByDate } from '../utils/sortMatchesByDate'

const Container = styled.div`
  padding: 1rem;
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
  width: 60px;
  border-right: 2px solid #f5f5f5;
`

const MatchData = styled(Link)`
  text-decoration: none;
  display: flex;
  flex: 1;
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

const TitleItem = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  background: #fff;
  margin: 0 0 1rem 0;
  border-radius: 5px;
  overflow: hidden;
`

const TitleInfo = styled.div`
  background: #1d3557;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #fff;
  width: 60px;
`

const TitleData = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  font-weight: 600;
`

const TitleMatches = styled.div`
  font-size: 10px;
`

const TitleOpponent = styled.span`
  color: #1d3557;
`

const TitleRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 100%;
  border-left: 2px solid #f5f5f5;
  color: #1d3557;
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
      <TitleItem>
        <TitleInfo>
          <TitleMatches>{player.matchesPlayed.length}</TitleMatches>
          <TitleMatches>
            {player.matchesPlayed.length > 1 ? 'matchs' : 'match'}
          </TitleMatches>
        </TitleInfo>
        <TitleData>
          <TitleOpponent>
            {player.firstName} {player.lastName}
          </TitleOpponent>
        </TitleData>
        <TitleRating>Notes</TitleRating>
      </TitleItem>
      <List>
        {player.matches &&
          player.matches.length > 0 &&
          sortMatchesByDate(player.matches, 'DESC').map((match) => (
            <MatchItem key={match.id}>
              <MatchInfo>
                <MatchDate>{match.date.slice(0, 5)}</MatchDate>
              </MatchInfo>
              <MatchData to={`/home/matchs/id/${match.id}`}>
                <MatchOpponent>{match.opponent}</MatchOpponent>
              </MatchData>
              <PlayerAverage>
                {(Math.round(match.lineup[0].average * 100) / 100).toFixed(2)}
              </PlayerAverage>
            </MatchItem>
          ))}
      </List>
    </Container>
  )
}

export default PlayerPage
