import React, { useState } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import {
  GET_MATCH,
  GET_MATCHES,
  REMOVE_MATCH,
  REMOVE_PLAYER_FROM_MATCH,
  ADD_PLAYER_TO_MATCH,
} from '../graphql/queries/match'
import ActionConfirm from './ActionConfirm'

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const MatchItem = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  background: #fff;
  margin: 0 0 1rem 0;
  border-radius: 5px;
  overflow: hidden;
`

const MatchInfo = styled.div`
  background: #1d3557;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #fff;
  width: 60px;
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

const MatchDel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100%;
  border-left: 2px solid #f5f5f5;
  color: #1d3557;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const PlayerItem = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 5px;
`

const PlayerMain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0 0 1rem;
  background: #fff;
`

const PlayerDel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  border-left: 2px solid #f5f5f5;
`

const PlayerName = styled.span`
  color: #14387f;
`

const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 1rem 0;
`

const PlayerSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  color: #14387f;
  width: 100%;
  outline: 0;
  height: 45px;
  background: #fff;

  &:focus {
    border: 1px solid #14387f;
  }
`

const SelectButton = styled.button`
  cursor: pointer;
  padding: 0.5rem 0;
  background: #14387f;
  border: 1px solid #14387f;
  color: #fff;
  font-weight: 600;
  width: 120px;
  margin-left: 5px;

  &:disabled {
    border: 1px solid #ccc;
    color: #ccc;
    background: #fff;
    cursor: default;
  }
`

const matchBtn = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  background: '#e63946',
  border: 0,
  outline: 0,
  cursor: 'pointer',
  color: '#fff',
}

const playerBtn = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#e63946',
  background: '#fff',
  border: 0,
  borderLeft: '2px solid #f5f5f5',
  outline: 0,
  cursor: 'pointer',
}

const LineupEdit = ({ match, user, players }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null)
  const { matchId } = useParams()
  const history = useHistory()

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

  const handleSelectedPlayerId = (e) => {
    setSelectedPlayerId(e.target.value)
  }

  const handleRemoveMatch = () => {
    removeMatch({ variables: { id: matchId } })
    history.push('/home/matchs')
  }

  const handleRemovePlayerFromMatch = (e) => {
    const playerId = e.currentTarget.getAttribute('data-id')
    if (playerId) {
      removePlayerFromMatch({
        variables: { matchId: matchId, playerId: playerId },
      })
    }
  }

  const handleAddPlayerToMatch = () => {
    if (selectedPlayerId) {
      addPlayerToMatch({
        variables: { matchId: matchId, playerId: selectedPlayerId },
      })
    }
  }

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
          <MatchDel>
            <ActionConfirm action={handleRemoveMatch} btnStyle={matchBtn}>
              Delete
            </ActionConfirm>
          </MatchDel>
        </MatchData>
      </MatchItem>
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
        <SelectButton
          onClick={handleAddPlayerToMatch}
          disabled={!selectedPlayerId}
        >
          Add Player
        </SelectButton>
      </SelectContainer>
      <PlayersList>
        {match.lineup.map((player, i) => (
          <PlayerItem key={player.playerId}>
            <PlayerMain>
              <PlayerName>{`${player.infos.firstName} ${player.infos.lastName}`}</PlayerName>
            </PlayerMain>
            <PlayerDel>
              <ActionConfirm
                data-id={player.playerId}
                action={handleRemovePlayerFromMatch}
                btnStyle={playerBtn}
              >
                X
              </ActionConfirm>
            </PlayerDel>
          </PlayerItem>
        ))}
      </PlayersList>
    </Container>
  )
}

export default LineupEdit
