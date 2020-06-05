import React from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { GET_MATCHES, SET_MATCH_ACTIVE } from '../graphql/queries/match'
import Loader from '../components/Loader'
import { sortMatchesByDate } from '../utils/sortMatchesByDate'

const List = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MatchItem = styled.div`
  text-decoration: none;
  display: flex;
  width: 100%;
  height: 45px;
  background: #fff;
  margin-bottom: 5px;
  border: 1px solid #dbdbdb;
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
`

const MatchLocation = styled.div`
  font-size: 10px;
`
const MatchDate = styled.span`
  font-size: 10px;
`
const MatchOpponent = styled(Link)`
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: #14387f;
  padding-left: 1rem;
`

const MatchActionContainer = styled.div`
  width: 60px;
  height: 100%;
  background: #f5f5f5;
  color: #1f55c2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #dbdbdb;
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

const MatchsList = ({ editMode }) => {
  const { loading, error, data: { matches } = {} } = useQuery(GET_MATCHES, {
    onCompleted: (res) => console.log(res),
  })

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
    <List>
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
              <MatchOpponent to={`/home/matchs/id/${match.id}`}>
                {match.opponent}
              </MatchOpponent>
              {editMode ? (
                <MatchActionContainer>
                  {!match.active ? (
                    <ActiveButton
                      data-id={match.id}
                      onClick={handleMatchActivation}
                    >
                      Go Live
                    </ActiveButton>
                  ) : (
                    'Live'
                  )}
                </MatchActionContainer>
              ) : (
                <MatchActionContainer>5</MatchActionContainer>
              )}
            </MatchData>
          </MatchItem>
        ))}
    </List>
  )
}

export default MatchsList
