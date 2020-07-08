import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ActionConfirm from '../ActionConfirm'
import { filterPlayersList } from '../../utils/filterPlayersList'
import { globalPlayerAverage } from '../../utils/globalPlayerAverage'

const List = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PlayerItem = styled.li`
  display: flex;
  width: 100%;
  height: 45px;
  background: #fff;
  margin-bottom: 5px;
  border-radius: 5px;
  overflow: hidden;
`

const PlayerInfo = styled(Link)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 1rem;
  text-decoration: none;
`

const PlayerName = styled.span`
  color: #1d3557;
`

const PlayerRatingContainer = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  width: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1d3557;
  border-left: 2px solid #f5f5f5;
`

const PlayerMatches = styled.div`
  border-right: 2px solid #f5f5f5;
  font-weight: 600;
  color: #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 60px;
  font-size: 10px;
`

const confirmBtn = {
  cursor: 'pointer',
  width: '80px',
  height: '100%',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  background: '#e63946',
  outline: 'none',
}

const PlayersList = ({ editMode, handleRemovePlayer, players }) => {
  return (
    <List>
      {players &&
        filterPlayersList(players, editMode).map((player, i) => (
          <PlayerItem key={player._id} data-testid="player-item">
            <PlayerMatches>{player.matchesPlayed.length}m.</PlayerMatches>
            <PlayerInfo to={`/home/players/id/${player._id}`}>
              <PlayerName data-testid="player-name">
                {player.firstName} {player.lastName}
              </PlayerName>
            </PlayerInfo>
            <PlayerRatingContainer data-testid="player-rating">
              {editMode ? (
                <ActionConfirm
                  data-id={player._id}
                  data-testid="remove-button"
                  btnStyle={confirmBtn}
                  action={handleRemovePlayer}
                >
                  X
                </ActionConfirm>
              ) : player.matchesPlayed.length === 0 ||
                player.matches.every((m) => m.lineup[0].average == null) ? (
                '-'
              ) : (
                globalPlayerAverage(player.matches)
              )}
            </PlayerRatingContainer>
          </PlayerItem>
        ))}
    </List>
  )
}

PlayersList.propTypes = {
  editMode: PropTypes.bool,
  handleRemovePlayer: PropTypes.func,
  players: PropTypes.array,
}

export default PlayersList
