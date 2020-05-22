import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { GET_MATCHES } from '../graphql/queries/match'

const Container = styled.div``

const MatchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 15px;
  padding: 15px;
`

const MatchesGridItem = styled.div`
  border: 2px solid rgba(20, 56, 127, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 125px;
  text-decoration: none;
  color: rgba(20, 56, 127, 1);
  font-weight: 600;
`

const MatchesPage = () => {
  const { loading, error, data: { matches } = {} } = useQuery(GET_MATCHES)

  if (loading) return <h1>Loading...</h1>
  if (error) return <p>{error.message}</p>

  return (
    <Container>
      <MatchesGrid>
        {matches.map((m) => (
          <MatchesGridItem key={m.id}>
            <h3>{m.opponent}</h3>
            <span>{m.date}</span>
          </MatchesGridItem>
        ))}
      </MatchesGrid>
    </Container>
  )
}

export default MatchesPage
