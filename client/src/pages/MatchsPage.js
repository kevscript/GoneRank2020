import React from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { GET_MATCHES, SET_MATCH_ACTIVE } from '../graphql/queries/match'
import Loader from '../components/Loader'
import MatchsList from '../components/MatchsList'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const MatchFormLink = styled(Link)`
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 40px;
  text-transform: uppercase;
  border: 1px solid #dbdbdb;
  background: #f5f5f5;
  color: #14387f;
  font-weight: 600;
  margin: 1rem;
`

const MatchsPage = ({ editMode }) => {
  const { loading, error, data: { matches } = {} } = useQuery(GET_MATCHES)

  const [setMatchActive] = useMutation(SET_MATCH_ACTIVE, {
    onError: (err) => console.log(err),
    update: (cache, { data: { setMatchActive } }) => {
      try {
        const { matches } = cache.readQuery({ query: GET_MATCHES })
        // immute matches array with all matches activity reseted to false
        let allMatches = [...matches].map((match) => ({
          ...match,
          active: false,
        }))
        // find match we want to make active
        let newMatch = allMatches.find((m) => m.id === setMatchActive.id)
        newMatch.active = true
        cache.writeQuery({
          query: GET_MATCHES,
          data: {
            matches: [...allMatches],
          },
        })
      } catch (err) {
        console.log(err)
      }
    },
  })

  const handleMatchActivation = (e) => {
    const matchId = e.currentTarget.getAttribute('data-id')
    if (matchId) {
      setMatchActive({
        variables: { id: matchId },
      })
    }
  }

  if (loading) return <Loader />
  if (error) return <p>{error.message}</p>

  return (
    <Container>
      {editMode && (
        <MatchFormLink to="/home/matchs/new">Create Match</MatchFormLink>
      )}
      <MatchsList
        editMode={editMode}
        matches={matches}
        handleMatchActivation={handleMatchActivation}
      />
    </Container>
  )
}

export default MatchsPage
