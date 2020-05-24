import React from 'react'
import styled from 'styled-components'
import { Switch, Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_MATCHES } from '../graphql/queries/match'
import { sortMatchesByDate } from '../utils/sortMatchesByDate'
import AdminRoute from '../routes/AdminRoute'
import MatchForm from '../components/forms/MatchForm'
import MatchInfos from '../components/MatchInfos'

const Container = styled.div`
  display: flex;
  width: 100%;
`

const ListContainer = styled.div`
  width: 400px;
  max-width: 50%;
  min-height: calc(100vh - 80px);
  background: #f4f4f4;
`

const ContentContainer = styled.div`
  flex: 1;
  min-height: calc(100vh - 80px);
  padding: 2rem;
`

const MatchesList = styled.ul`
  width: 100%;
`

const MatchItem = styled(Link)`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  &:hover {
    background: #eee;
  }
`

const MatchOpponent = styled.span`
  font-weight: 600;
`

const MatchDate = styled.span``

const ActionContainer = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Action = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background: red;
  color: #f4f4f4;
  font-weight: 600;
`

const MatchesPage = ({ user }) => {
  const { loading, error, data: { matches } = {} } = useQuery(GET_MATCHES)

  if (loading) return <h1>Loading...</h1>
  if (error) return <p>{error.message}</p>

  return (
    <Container>
      <ListContainer>
        <ActionContainer>
          <Action to={'/admin/matches/new'}>New Match</Action>
        </ActionContainer>
        <MatchesList>
          {sortMatchesByDate(matches).map((m) => (
            <MatchItem to={`/admin/matches/id/${m.id}`} key={m.id}>
              <MatchOpponent>
                {m.location === 'away'
                  ? `${m.opponent} vs OL`
                  : `OL vs ${m.opponent}`}
              </MatchOpponent>
              <MatchDate>{m.date}</MatchDate>
            </MatchItem>
          ))}
        </MatchesList>
      </ListContainer>

      <ContentContainer>
        <Switch>
          <AdminRoute
            path="/admin/matches/id/:id"
            user={user}
            component={MatchInfos}
          />
          <AdminRoute
            path="/admin/matches/new"
            user={user}
            component={MatchForm}
          />
        </Switch>
      </ContentContainer>
    </Container>
  )
}

export default MatchesPage
