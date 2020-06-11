import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { sortMatchesByDate } from '../utils/sortMatchesByDate'
import ActionConfirm from './ActionConfirm'

const List = styled.div`
  padding: 1rem;
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
  border: 1px solid #dbdbdb;
`

const MatchInfo = styled.div`
  background: #14387f;
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
  width: 100%;
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
  color: #14387f;
  padding-left: 1rem;
`

const MatchActionContainer = styled.div`
  width: 80px;
  height: 100%;
  background: #f5f5f5;
  color: #1f55c2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #dbdbdb;
`

const ActiveStatus = styled.span`
  color: #da001a;
  text-transform: uppercase;
`

const confirmBtn = {
  width: '100%',
  height: '100%',
  background: '#14387f',
  border: 0,
  outline: 0,
  cursor: 'pointer',
  color: '#fff',
}

const MatchsList = ({ editMode, matches, handleMatchActivation }) => {
  return (
    <List>
      {matches &&
        sortMatchesByDate(matches).map((match) => (
          <MatchItem key={match.id}>
            <MatchInfo>
              <MatchLocation>
                {match.location === 'home' ? 'Dom.' : 'Ext.'}
              </MatchLocation>
              <MatchDate>{match.date.slice(0, 5)}</MatchDate>
            </MatchInfo>
            <MatchData>
              <MatchOpponent to={`/home/matchs/id/${match.id}`}>
                {match.opponent}
              </MatchOpponent>
              {editMode ? (
                <MatchActionContainer>
                  {!match.active ? (
                    <ActionConfirm
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
                <MatchActionContainer>
                  {match.average ? match.average : '-'}
                </MatchActionContainer>
              )}
            </MatchData>
          </MatchItem>
        ))}
    </List>
  )
}

export default MatchsList
