import React from 'react'
import styled from 'styled-components'

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
  border: 1px solid #dbdbdb;
`

const PlayerInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 0 0 1rem;
`

const PlayerRanking = styled.div`
  display: flex;
  justify-content: center;
  font-size: 10px;
  align-items: center;
  width: 40px;
  height: 100%;
  background: transparent;
  color: #333;
`

const PlayerName = styled.span`
  color: #14387f;
`

const PlayerRatingContainer = styled.div`
  width: 60px;
  height: 100%;
  background: #f5f5f5;
  color: #1f55c2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #dbdbdb;
`

const PlayerDeleteButton = styled.button`
  cursor: pointer;
  width: 60px;
  height: 100%;
  background: #f5f5f5;
  color: #1f55c2;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-left: 1px solid #dbdbdb;
  outline: none;
`

const PlayersList = ({ editMode, handleRemovePlayer, players }) => {
  return (
    <List>
      {players &&
        players.map((player, i) => (
          <PlayerItem key={player._id} data-testid="player-item">
            <PlayerRanking data-testid="player-ranking">
              {player.globalAverage === 0 ? '-' : `#${i + 1}`}
            </PlayerRanking>
            <PlayerInfo>
              <PlayerName data-testid="player-name">
                {player.firstName} {player.lastName}
              </PlayerName>
              <PlayerRatingContainer data-testid="player-rating">
                {editMode ? (
                  <PlayerDeleteButton
                    data-id={player._id}
                    data-testid="remove-button"
                    onClick={handleRemovePlayer}
                  >
                    X
                  </PlayerDeleteButton>
                ) : player.globalAverage === 0 ? (
                  '-'
                ) : (
                  player.globalAverage
                )}
              </PlayerRatingContainer>
            </PlayerInfo>
          </PlayerItem>
        ))}
    </List>
  )
}

export default PlayersList
