import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_MATCH } from '../graphql/queries/match'

const MatchInfos = () => {
  const { id } = useParams()
  const { loading, error, data: { match } = {} } = useQuery(GET_MATCH, {
    variables: { id: id },
  })

  if (loading) return <h1>Loading...</h1>
  if (error) return <p>{error.message}</p>

  return <div>{match.opponent}</div>
}

export default MatchInfos
