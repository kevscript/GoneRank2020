import React from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { GET_MATCHES, SET_MATCH_ACTIVE } from '../graphql/queries/match'
import Loader from '../components/Loader'
import MatchsList from '../components/MatchsList'
import { TransitionWrapper } from '../components/TransitionWrapper'

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 0 1rem;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
`

const MatchFormLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 45px;
  background: #1d3557;
  color: #fff;
  font-weight: 500;
  margin: 1rem 1rem 0 1rem;
  outline: 0;
  border-radius: 5px;
  cursor: pointer;
`

const Message = styled.div`
  margin: 1rem;
`

const TitleBar = styled.li`
  display: flex;
  margin-top: 1rem;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  overflow: hidden;
  text-transform: uppercase;
`

const TitleMain = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  height: 100%;
  text-decoration: none;
  padding-left: 1rem;
`

const TitleText = styled.span`
  font-size: 10px;
  color: #14387f;
`

const TitleRating = styled.div`
  font-size: 10px;
  width: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #14387f;
`

const TitleInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 52px;
  font-size: 10px;
  color: #14387f;
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
    <TransitionWrapper>
      <Container>
        {editMode && (
          <MatchFormLink to="/home/matchs/new">Nouveau Match</MatchFormLink>
        )}
        <TitleBar>
          <TitleInfo>Infos</TitleInfo>
          <TitleMain>
            <TitleText>matchs - 2020/21</TitleText>
          </TitleMain>
          <TitleRating>NOTES</TitleRating>
        </TitleBar>
        {matches.length > 0 ? (
          <MatchsList
            editMode={editMode}
            matches={matches}
            handleMatchActivation={handleMatchActivation}
          />
        ) : (
          <Message>Pas encore de matchs.</Message>
        )}
      </Container>
    </TransitionWrapper>
  )
}

export default MatchsPage
