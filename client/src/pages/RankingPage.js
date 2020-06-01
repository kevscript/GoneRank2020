import React from 'react'
import styled from 'styled-components'
import Loader from '../components/Loader'
import { useQuery } from '@apollo/react-hooks'
import { GET_PLAYERS } from '../graphql/queries/player'
import { sortByAvg } from '../utils/sortByAvg'

const Container = styled.div`
  width: 100%;
  padding-bottom: 60px;
  background: #fff;
`

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PlayersList = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PlayerItem = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  background: #eff4ff;
  margin-bottom: 5px;
`

const PlayerInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 0 0 1rem;
`

const PlayerRanking = styled.div`
  display: flex;
  justify-content: center;
  font-size: 10px;
  align-items: center;
  width: 40px;
  height: 100%;
  background: #14387f;
  color: #fff;
`

const PlayerName = styled.span`
  color: #14387f;
`

const PlayerAverage = styled.span`
  font-weight: 600;
  text-align: center;
`

const PlayerRatingContainer = styled.div`
  width: 60px;
  height: 100%;
  background: #da001a;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RankingPage = () => {
  const { loading, error, data: { players } = {} } = useQuery(GET_PLAYERS, {
    onCompleted: (res) => console.log(res),
  })

  if (loading) return <Loader />
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
                <PlayerRatingContainer>
                  <PlayerAverage>
                    {player.globalAverage === 0 ? '-' : player.globalAverage}
                  </PlayerAverage>
                </PlayerRatingContainer>
              </PlayerInfo>
            </PlayerItem>
          ))}
      </PlayersList>
    </Container>
  )
}

export default RankingPage
