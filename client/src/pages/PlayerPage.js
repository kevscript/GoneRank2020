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
  })

  if (loading) return <Loader />
  if (error) return <span>{error.message}</span>

  return (
    <div>
      {player.matchAverages.length > 0 &&
        player.matchAverages.map((match) => (
          <li key={match.matchId}>
            {match.matchId} - {match.average}
          </li>
        ))}
    </div>
  )
}

export default PlayerPage
