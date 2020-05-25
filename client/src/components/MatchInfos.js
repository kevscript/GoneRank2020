import React, { useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  GET_MATCH,
  REMOVE_PLAYER_FROM_MATCH,
  ADD_PLAYER_TO_MATCH,
} from '../graphql/queries/match'
import { GET_PLAYERS } from '../graphql/queries/player'

const PlayerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`
const SelectContainer = styled.div`
  margin: 1rem 0;
`

const Select = styled.select`
  padding: 5px 10px;
  width: 250px;
`

const SelectButton = styled.button`
  padding: 5px 10px;
`

const MatchInfos = () => {
  // get match Id from url params
  const { matchId } = useParams()
  // state for id of selected player to add
  const [selectedPlayerId, setSelectedPlayerId] = useState(null)
  // fetching data of match with id = matchId
  const {
    loading: matchLoading,
    error: matchError,
    data: { match } = {},
  } = useQuery(GET_MATCH, {
    variables: { id: matchId },
  })
  // fetch all the players
  const {
    loading: playersLoading,
    error: playersError,
    data: { players } = {},
  } = useQuery(GET_PLAYERS)

  // mutation removing a player from a match
  const [removePlayerFromMatch] = useMutation(REMOVE_PLAYER_FROM_MATCH, {
    update: (cache, { data: { removePlayerFromMatch } }) => {
      try {
        const { match } = cache.readQuery({
          query: GET_MATCH,
          variables: { id: matchId },
        })
        const newLineup = match.lineup.filter(
          (p) => p.playerId !== removePlayerFromMatch._id
        )
        cache.writeQuery({
          query: GET_MATCH,
          data: { match: { ...match, lineup: newLineup } },
        })
      } catch (err) {
        console.log(err)
      }
    },
  })

  const [addPlayerToMatch] = useMutation(ADD_PLAYER_TO_MATCH, {
    update: (cache, { data: { addPlayerToMatch } }) => {
      try {
        const { match } = cache.readQuery({
          query: GET_MATCH,
          variables: { id: matchId },
        })
        const newLineup = [
          ...match.lineup,
          {
            __typename: 'MatchLineupPlayer',
            playerId: addPlayerToMatch._id,
            ratings: [],
            average: 0,
            infos: {
              firstName: addPlayerToMatch.firstName,
              lastName: addPlayerToMatch.lastName,
              __typename: 'Player',
            },
          },
        ]
        cache.writeQuery({
          query: GET_MATCH,
          data: { match: { ...match, lineup: newLineup } },
        })
      } catch (err) {
        console.log(err)
      }
    },
  })

  const handleSelector = (e) => setSelectedPlayerId(e.target.value)

  const handleAddPlayer = () => {
    if (selectedPlayerId) {
      addPlayerToMatch({
        variables: { matchId: matchId, playerId: selectedPlayerId },
      })
    }
  }

  if (matchLoading) return <h1>Loading...</h1>
  if (matchError) return <p>{matchError.message}</p>

  return (
    <div>
      <h3>
        {match.location === 'away'
          ? `${match.opponent} vs OL`
          : `OL vs ${match.opponent}`}
      </h3>
      <span>{match.date}</span>
      <div>
        {match.lineup.map((p) => (
          <PlayerItem key={p.playerId}>
            <span>
              {p.infos.firstName} {p.infos.lastName}
            </span>
            <span>{p.average ? p.average : '0'}/10</span>
            <button
              onClick={() =>
                removePlayerFromMatch({
                  variables: { matchId: matchId, playerId: p.playerId },
                })
              }
            >
              X
            </button>
          </PlayerItem>
        ))}
      </div>
      <SelectContainer>
        <Select name="addPlayer" onChange={(e) => handleSelector(e)}>
          <option value={null}></option>
          {players &&
            players
              .filter((p) => !match.lineup.some((x) => x.playerId === p._id))
              .map((p) => (
                <option key={p._id} value={p._id}>
                  {p.firstName} {p.lastName}
                </option>
              ))}
        </Select>
        <SelectButton disabled={!selectedPlayerId} onClick={handleAddPlayer}>
          Add Player
        </SelectButton>
      </SelectContainer>
    </div>
  )
}

export default MatchInfos
