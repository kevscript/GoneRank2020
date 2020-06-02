import React, { useState } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  GET_MATCH,
  GET_MATCHES,
  REMOVE_MATCH,
  REMOVE_PLAYER_FROM_MATCH,
  ADD_PLAYER_TO_MATCH,
} from '../../graphql/queries/match'
import { GET_PLAYERS } from '../../graphql/queries/player'
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

const MatchRemove = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RemoveButton = styled.button`
  width: 100%;
  height: 100%;
  background: #da001a;
  opacity: 1;
  color: #fff;
  border: 0;
  outline: 0;
  cursor: pointer;
`

const PlayersList = styled.div`
  margin-top: 1rem;
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

const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0 5px;
`

const PlayerSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #14387f;
  outline-color: #14387f;
  color: #14387f;
  width: 100%;
`

const SelectButton = styled.button`
  padding: 0.25rem 0.5rem;
  background: #fff;
  border: 1px solid #14387f;
  color: #14387f;
  font-weight: 600;
`

const AdminMatchPage = () => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null)
  const { matchId } = useParams()
  const history = useHistory()
  const { loading, error, data: { match } = {} } = useQuery(GET_MATCH, {
    skip: !matchId,
    variables: { id: matchId },
    onCompleted: (res) => console.log(res),
  })
  const {
    loading: playersLoading,
    error: playersError,
    data: { players } = {},
  } = useQuery(GET_PLAYERS)

  const [removeMatch] = useMutation(REMOVE_MATCH, {
    onError: (err) => console.log(err),
    update: (cache, { data: { removeMatch } }) => {
      try {
        const { matches } = cache.readQuery({ query: GET_MATCHES })
        const filteredMatches = matches.filter((m) => m.id !== removeMatch.id)
        cache.writeQuery({
          query: GET_MATCHES,
          data: { matches: filteredMatches },
        })
      } catch (err) {
        console.log(err)
      }
    },
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

  const [addPlayerToMatch] = useMutation(ADD_PLAYER_TO_MATCH, {
    onError: (err) => console.log(err),
    onCompleted: () => setSelectedPlayerId(null),
    update: (cache, { data: { addPlayerToMatch } }) => {
      try {
        const { match } = cache.readQuery({
          query: GET_MATCH,
          variables: { id: matchId },
        })
        const newMatch = { ...match }
        newMatch.lineup = [
          ...newMatch.lineup,
          {
            playerId: addPlayerToMatch._id,
            ratings: [],
            average: null,
            infos: {
              firstName: addPlayerToMatch.firstName,
              lastName: addPlayerToMatch.lastName,
              __typename: 'Player',
            },
            __typename: 'MatchLineupPlayer',
          },
        ]
        cache.writeQuery({
          query: GET_MATCH,
          data: { match: newMatch },
        })
      } catch (err) {
        console.log(err)
      }
    },
  })

  const handleRemoveMatch = () => {
    removeMatch({ variables: { id: matchId } })
    history.push('/home/admin/fixtures')
  }

  const handleRemovePlayerFromMatch = (e) => {
    const playerId = e.currentTarget.getAttribute('data-id')
    if (playerId) {
      removePlayerFromMatch({
        variables: { matchId: matchId, playerId: playerId },
      })
    }
  }

  const handleSelectedPlayerId = (e) => {
    setSelectedPlayerId(e.target.value)
  }

  const handleAddPlayerToMatch = () => {
    if (selectedPlayerId) {
      addPlayerToMatch({
        variables: { matchId: matchId, playerId: selectedPlayerId },
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
          <MatchRemove>
            <RemoveButton onClick={handleRemoveMatch}>X</RemoveButton>
          </MatchRemove>
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
      <SelectContainer>
        <PlayerSelect name="addPlayer" onChange={handleSelectedPlayerId}>
          <option value={null}></option>
          {players &&
            players
              .filter(
                (p) => match.lineup.some((x) => x.playerId === p._id) === false
              )
              .map((p) => (
                <option
                  key={p._id}
                  value={p._id}
                >{`${p.firstName} ${p.lastName}`}</option>
              ))}
        </PlayerSelect>
        <SelectButton onClick={handleAddPlayerToMatch}>Add Player</SelectButton>
      </SelectContainer>
    </Container>
  )
}

export default AdminMatchPage
