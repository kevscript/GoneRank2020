import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_PLAYER } from '../graphql/queries/player'
import Loader from '../components/Loader'

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
    <div>
      {player.matches &&
        player.matches.length > 0 &&
        player.matches.map((match) => (
          <li key={match.id}>
            <span>{match.opponent}</span>
            <span>{match.lineup[0].average}</span>
          </li>
        ))}
    </div>
  )
}

export default PlayerPage
