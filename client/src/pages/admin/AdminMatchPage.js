import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  GET_MATCH,
  REMOVE_PLAYER_FROM_MATCH,
} from '../../graphql/queries/match'
import Loader from '../../components/Loader'

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`

const MatchItem = styled.div`
  text-decoration: none;
  width: 100%;
  display: flex;
  height: 50px;
  background: #eff4ff;
  border-bottom: 1px solid #14387f;
`

const MatchInfo = styled.div`
  background: #14387f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #fff;
  width: 50px;
`

const MatchData = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  font-weight: 600;
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

const PlayersList = styled.div`
  padding: 5px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`

const PlayerItem = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
`

const PlayerMain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background: #eff4ff;
`

const PlayerName = styled.span`
  color: #14387f;
`

const PlayerDeleteButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 100%;
  background: #da001a;
  color: #fff;
  border: none;
  outline: none;
`

const PlayerButtonContainer = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AdminMatchPage = () => {
  const { matchId } = useParams()
  const { loading, error, data: { match } = {} } = useQuery(GET_MATCH, {
    skip: !matchId,
    variables: { id: matchId },
  })

  const [removePlayerFromMatch] = useMutation(REMOVE_PLAYER_FROM_MATCH, {
    onError: (err) => console.log(err),
    update: (cache, { data: { removePlayerFromMatch } }) => {
      try {
        const { match } = cache.readQuery({
          query: GET_MATCH,
          variables: { id: matchId },
        })
        cache.writeQuery({
          query: GET_MATCH,
          variables: { id: matchId },
          data: {
            match: {
              ...match,
              lineup: match.lineup.filter(
                (p) => p.playerId !== removePlayerFromMatch._id
              ),
            },
          },
        })
      } catch (err) {
        console.log(err)
      }
    },
  })

  const handleRemovePlayerFromMatch = (e) => {
    const playerId = e.currentTarget.getAttribute('data-id')
    if (playerId) {
      removePlayerFromMatch({
        variables: { matchId: matchId, playerId: playerId },
      })
    }
  }

  if (loading) return <Loader />
  if (error) return <p>{error.message}</p>

  return (
    <Container>
      <MatchItem>
        <MatchInfo>
          <MatchLocation>
            {match.location === 'home' ? 'Dom.' : 'Ext.'}
          </MatchLocation>
          <MatchDate>{match.date.slice(0, 5)}</MatchDate>
        </MatchInfo>
        <MatchData>
          <MatchOpponent>{match.opponent}</MatchOpponent>
        </MatchData>
      </MatchItem>
      <PlayersList>
        {match.lineup.map((player, i) => (
          <PlayerItem key={player.playerId}>
            <PlayerMain>
              <PlayerName>{`${player.infos.firstName} ${player.infos.lastName}`}</PlayerName>
            </PlayerMain>
            <PlayerButtonContainer>
              <PlayerDeleteButton
                data-id={player.playerId}
                onClick={handleRemovePlayerFromMatch}
              >
                X
              </PlayerDeleteButton>
            </PlayerButtonContainer>
          </PlayerItem>
        ))}
      </PlayersList>
    </Container>
  )
}

export default AdminMatchPage
