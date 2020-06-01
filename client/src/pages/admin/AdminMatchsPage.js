import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { GET_MATCHES } from '../../graphql/queries/match'
import { sortMatchesByDate } from '../../utils/sortMatchesByDate'
import Loader from '../../components/Loader'

const Container = styled.div`
  width: 100%;
`

const MatchsList = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MatchItem = styled(Link)`
  text-decoration: none;
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
const MatchOpponent = styled.span`
  color: #14387f;
`

const MatchRating = styled.div`
  background: #da001a;
  color: #fff;
  width: 60px;
  height: 100%;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AdminMatchsPage = () => {
  const { loading, error, data: { matches } = {} } = useQuery(GET_MATCHES)

  if (loading) return <Loader />
  if (error) return <p>{error.message}</p>

  return (
    <Container>
      <MatchsList>
        {matches &&
          sortMatchesByDate(matches).map((match) => (
            <MatchItem to={`/home/admin/fixtures/${match.id}`} key={match.id}>
              <MatchInfo>
                <MatchLocation>
                  {match.location === 'home' ? 'Dom.' : 'Ext.'}
                </MatchLocation>
                <MatchDate>{match.date.slice(0, 5)}</MatchDate>
              </MatchInfo>
              <MatchData>
                <MatchOpponent>
                  {match.location === 'home'
                    ? `OL vs ${match.opponent}`
                    : `${match.opponent} vs OL`}
                </MatchOpponent>
                <MatchRating>5</MatchRating>
              </MatchData>
            </MatchItem>
          ))}
      </MatchsList>
    </Container>
  )
}

export default AdminMatchsPage
