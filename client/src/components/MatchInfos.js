import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_MATCH } from '../graphql/queries/match'

const PlayerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`

const MatchInfos = () => {
  const { id } = useParams()
  const { loading, error, data: { match } = {} } = useQuery(GET_MATCH, {
    variables: { id: id },
  })

  if (loading) return <h1>Loading...</h1>
  if (error) return <p>{error.message}</p>

  return (
    <div>
      <h3>
        {match.location === 'away'
          ? `${match.opponent} vs OL`
          : `OL vs ${match.opponent}`}
      </h3>
      <span>{match.date}</span>
      <div>
        {match.lineup.map((p) => (
          <PlayerItem key={p.playerId}>
            <span>
              {p.infos.firstName} {p.infos.lastName}
            </span>
            <span>{p.average}/10</span>
          </PlayerItem>
        ))}
      </div>
    </div>
  )
}

export default MatchInfos
