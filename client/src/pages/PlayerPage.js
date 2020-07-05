import React from 'react'
import { useParams } from 'react-router-dom'

const PlayerPage = () => {
  const { playerId } = useParams()
  return <div>Player Page for {playerId}</div>
}

export default PlayerPage
