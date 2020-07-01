import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ActionConfirm from '../ActionConfirm'
import { filterPlayersList } from '../../utils/filterPlayersList'

const List = styled.div`
  padding: 1rem;
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

const PlayerInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 0 0 1rem;
`

const PlayerName = styled.span`
  color: #1d3557;
`

const PlayerRatingContainer = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1d3557;
  border-left: 2px solid #f5f5f5;
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
            <PlayerInfo>
              <PlayerName data-testid="player-name">
                {player.firstName} {player.lastName}
              </PlayerName>
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
                ) : player.globalAverage === 0 ? (
                  '-'
                ) : (
                  (Math.round(player.globalAverage * 100) / 100).toFixed(2)
                )}
              </PlayerRatingContainer>
            </PlayerInfo>
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