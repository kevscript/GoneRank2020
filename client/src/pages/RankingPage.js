import React from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_PLAYERS, REMOVE_PLAYER } from '../graphql/queries/player'
import Loader from '../components/Loader'
import PlayerForm from '../components/PlayerForm'
import PlayersList from '../components/PlayersList'
import { sortByAvg } from '../utils/sortByAvg'
import { TransitionWrapper } from '../components/TransitionWrapper'

const Container = styled.div`
  width: 100%;
  padding: 0 1rem;
  max-width: 800px;
  margin: 0 auto;
  background: #f5f5f5;
`

const Message = styled.div`
  margin: 1rem;
`

const TitleBar = styled.li`
  display: flex;
  margin-top: 1rem;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  overflow: hidden;
  text-transform: uppercase;
`

const TitleMain = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  height: 100%;
  text-decoration: none;
  padding-left: 1rem;
  color: #1d3557;
`

const TitleText = styled.span`
  font-size: 10px;
  color: #14387f;
`

const TitleRating = styled.div`
  font-size: 10px;
  width: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 2px solid #f5f5f5;
  color: #14387f;
`

const TitleMatches = styled.div`
  border-right: 2px solid #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 60px;
  font-size: 10px;
  color: #14387f;
`

const RankingPage = ({ editMode }) => {
  const { loading, error, data: { players } = {} } = useQuery(GET_PLAYERS)

  const [removePlayer] = useMutation(REMOVE_PLAYER, {
    onError: (err) => console.log(err),
    update: (cache, { data: { removePlayer } }) => {
      try {
        const { players } = cache.readQuery({ query: GET_PLAYERS })
        cache.writeQuery({
          query: GET_PLAYERS,
          data: { players: players.filter((p) => p._id !== removePlayer._id) },
        })
      } catch (err) {
        console.log(err)
      }
    },
  })

  const handleRemovePlayer = (e) => {
    const playerId = e.currentTarget.getAttribute('data-id')
    if (playerId) {
      removePlayer({
        variables: { id: playerId },
      })
    }
  }

  if (loading) return <Loader />
  if (error) return <p>{error.message}</p>

  return (
    <TransitionWrapper>
      <Container>
        {editMode && <PlayerForm />}
        {!editMode && (
          <TitleBar>
            <TitleMatches>MATCHS</TitleMatches>
            <TitleMain>
              <TitleText>CLASSEMENT 2020/21</TitleText>
            </TitleMain>
            <TitleRating>NOTES</TitleRating>
          </TitleBar>
        )}
        {players.length > 0 ? (
          <PlayersList
            editMode={editMode}
            players={sortByAvg(players)}
            handleRemovePlayer={handleRemovePlayer}
          />
        ) : (
          <Message>Pas encore de joueurs.</Message>
        )}
      </Container>
    </TransitionWrapper>
  )
}

export default RankingPage
