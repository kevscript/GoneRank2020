import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { sortMatchesByDate } from '../../utils/sortMatchesByDate'
import ActionConfirm from '../ActionConfirm'
import LockIcon from '../../assets/lock.svg'

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MatchItem = styled.div`
  text-decoration: none;
  display: flex;
  width: 100%;
  height: 45px;
  background: #fff;
  margin-bottom: 5px;
  border-radius: 5px;
  overflow: hidden;
`

const MatchInfo = styled.div`
  background: #1d3557;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50px;
`

const MatchData = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`

const MatchLocation = styled.div`
  font-size: 10px;
`
const MatchDate = styled.span`
  font-size: 10px;
`
const MatchOpponent = styled(Link)`
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #1d3557;
  padding: 0 1rem;
`

const MatchActionContainer = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  width: 60px;
  height: 100%;
  color: #1d3557;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 2px solid #f5f5f5;
`

const ActiveStatus = styled.span`
  color: #457b9d;
  text-transform: uppercase;
`

const ActivityIcon = styled.div`
  width: 15px;
  height: auto;
`

const confirmBtn = {
  width: '100%',
  height: '100%',
  background: '#1d3557',
  border: 0,
  outline: 0,
  cursor: 'pointer',
  color: '#fff',
}

const MatchsList = ({ editMode, matches, handleMatchActivation }) => {
  return (
    <List>
      {matches &&
        sortMatchesByDate(matches, 'DESC').map((match) => (
          <MatchItem key={match.id} data-testid="match-item">
            <MatchInfo>
              <MatchLocation data-testid="match-location">
                {match.location === 'home' ? 'Dom.' : 'Ext.'}
              </MatchLocation>
              <MatchDate data-testid="match-date">
                {match.date.slice(0, 5)}
              </MatchDate>
            </MatchInfo>
            <MatchData>
              <MatchOpponent to={`/home/matchs/id/${match.id}`}>
                <span data-testid="match-opponent">{match.opponent}</span>
                {match.active ? (
                  <ActivityIcon>
                    <img src={LockIcon} alt="lock icon" />
                  </ActivityIcon>
                ) : null}
              </MatchOpponent>
            </MatchData>
            {editMode ? (
              <MatchActionContainer>
                {!match.active ? (
                  <ActionConfirm
                    data-testid="activation-button"
                    data-id={match.id}
                    action={handleMatchActivation}
                    btnStyle={confirmBtn}
                  >
                    Activer
                  </ActionConfirm>
                ) : (
                  <ActiveStatus>ACTIF</ActiveStatus>
                )}
              </MatchActionContainer>
            ) : (
              <MatchActionContainer data-testid="match-average">
                {match.average
                  ? (Math.round(match.average * 100) / 100).toFixed(2)
                  : '-'}
              </MatchActionContainer>
            )}
          </MatchItem>
        ))}
    </List>
  )
}

MatchsList.propTypes = {
  editMode: PropTypes.bool,
  matches: PropTypes.array,
  handleMatchActivation: PropTypes.func,
}

export default MatchsList
