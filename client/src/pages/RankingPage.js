import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { GET_PLAYERS } from '../graphql/queries/player'
import { sortByAvg } from '../utils/sortByAvg'

const Container = styled.div`
  width: 100%;
`

const PlayersList = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PlayerItem = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  background: #f5f5f5;
  margin-bottom: 5px;
`

const PlayerInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 1rem;
`

const PlayerRanking = styled.div`
  display: flex;
  justify-content: center;
  font-size: 10px;
  align-items: center;
  width: 40px;
  height: 100%;
  background: #dbdbdb;
  color: #14387f;
`

const PlayerName = styled.span`
  color: #14387f;
`

const PlayerAverage = styled.span`
  color: #14387f;
  font-weight: 600;
`

const RankingPage = () => {
  const { loading, error, data: { players } = {} } = useQuery(GET_PLAYERS, {
    onCompleted: (res) => console.log(res),
  })

  if (loading) return <h1>Loading...</h1>
  if (error) return <p>{error.message}</p>

  return (
    <Container>
      <PlayersList>
        {players &&
          sortByAvg(players).map((player, i) => (
            <PlayerItem key={player._id}>
              <PlayerRanking>
                {player.globalAverage === 0 ? '-' : i + 1}
              </PlayerRanking>
              <PlayerInfo>
                <PlayerName>
                  {player.firstName} {player.lastName}
                </PlayerName>
                <PlayerAverage>
                  {player.globalAverage === 0 ? '-' : player.globalAverage}
                </PlayerAverage>
              </PlayerInfo>
            </PlayerItem>
          ))}
      </PlayersList>
    </Container>
  )
}

export default RankingPage
