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
  display: flex;
  flex-direction: column;
`

const MatchItem = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  background: #fff;
  margin: 1rem 0;
  border: 1px solid #dbdbdb;
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

const MatchDel = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  border: 1px solid #dbdbdb;
`

const PlayerMain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background: #fff;
`

const PlayerDel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
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
  border: 1px solid #14387f;
  color: #14387f;
  width: 100%;
  outline: 0;
  background: #fff;

  &:focus {
    outline: 1px solid #14387f;
  }
`

const SelectButton = styled.button`
  cursor: pointer;
  padding: 0.5rem 0;
  background: #eff4ff;
  border: 1px solid #14387f;
  color: #14387f;
  font-weight: 600;
  width: 120px;
  margin-left: 5px;

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`

const matchBtn = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  background: '#f5f5f5',
  border: 0,
  borderLeft: '1px solid #dbdbdb',
  outline: 0,
  cursor: 'pointer',
  color: '#da001a',
}

const playerBtn = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#da001a',
  background: '#f5f5f5',
  border: 0,
  outline: 0,
  borderLeft: '1px solid #dbdbdb',
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
    </Container>
  )
}

export default LineupEdit
