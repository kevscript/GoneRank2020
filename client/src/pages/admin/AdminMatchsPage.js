import React from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { GET_MATCHES, SET_MATCH_ACTIVE } from '../../graphql/queries/match'
import { sortMatchesByDate } from '../../utils/sortMatchesByDate'
import Loader from '../../components/Loader'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const MatchsList = styled.div`
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MatchItem = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background: #eff4ff;
  margin-bottom: 5px;
`

const MatchInfo = styled.div`
  background: #14387f;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50px;
`

const MatchData = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 1rem;
`

const MatchLocation = styled.div`
  font-size: 10px;
`
const MatchDate = styled.span`
  font-size: 10px;
`
const MatchOpponent = styled(Link)`
  text-decoration: none;
  color: #14387f;
`

const MatchActive = styled.div`
  background: #eff4ff;
  color: #da001a;
  width: 60px;
  height: 100%;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ActiveButton = styled.button`
  width: 100%;
  height: 100%;
  background: #d49f45;
  border: 0;
  outline: 0;
  cursor: pointer;
  color: #fff;
`

const NewMatchLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #14387f;
  font-weight: 600;
  margin: 1rem 5px;
  text-decoration: none;
  color: #14387f;
`

const AdminMatchsPage = () => {
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
      <NewMatchLink to="/home/admin/fixtures/new">New Match +</NewMatchLink>
      <MatchsList>
        {matches &&
          sortMatchesByDate(matches).map((match) => (
            <MatchItem key={match.id}>
              <MatchInfo>
                <MatchLocation>
                  {match.location === 'home' ? 'Dom.' : 'Ext.'}
                </MatchLocation>
                <MatchDate>{match.date.slice(0, 5)}</MatchDate>
              </MatchInfo>
              <MatchData>
                <MatchOpponent to={`/home/admin/fixtures/id/${match.id}`}>
                  {match.location === 'home'
                    ? `OL vs ${match.opponent}`
                    : `${match.opponent} vs OL`}
                </MatchOpponent>
                <MatchActive>
                  {!match.active ? (
                    <ActiveButton
                      data-id={match.id}
                      onClick={handleMatchActivation}
                    >
                      Activate
                    </ActiveButton>
                  ) : (
                    'Live'
                  )}
                </MatchActive>
              </MatchData>
            </MatchItem>
          ))}
      </MatchsList>
    </Container>
  )
}

export default AdminMatchsPage
