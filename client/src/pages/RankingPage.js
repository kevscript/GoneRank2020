import React from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_PLAYERS, REMOVE_PLAYER } from '../graphql/queries/player'
import { sortByAvg } from '../utils/sortByAvg'
import Loader from '../components/Loader'
import PlayerForm from '../components/PlayerForm'
import PlayersList from '../components/PlayersList'

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: #f5f5f5;
`

const Message = styled.div`
  margin: 1rem;
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
    <Container>
      {editMode && <PlayerForm />}
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
  )
}

export default RankingPage
