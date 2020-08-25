import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { ADD_USER_VOTES } from '../../graphql/queries/votes'
import RatingInput from '../RatingInput'

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
  flex: 1;
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
  color: #1d3557;
`

const MatchRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100%;
  border-left: 2px solid #f5f5f5;
  color: #1d3557;
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
  margin-bottom: 5px;
  border-radius: 5px;
  overflow: hidden;
`

const PlayerMain = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background: #fff;
`

const PlayerName = styled.span`
  color: #1d3557;
`

const PlayerRating = styled.div`
  width: 100px;
  border-radius: 5px;
`

const PlayerAvg = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  color: #1d3557;
  font-weight: 600;
  border-left: 2px solid #f5f5f5;
`

const SubmitButton = styled.button`
  cursor: pointer;
  width: 100%;
  margin: 1rem auto;
  height: 45px;
  background: #1d3557;
  color: #fff;
  border-radius: 5px;
  font-weight: 500;
  outline: 0;
  border: 0;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ErrorMessage = styled.p`
  color: #e63946;
  font-size: 12px;
`

const ConfirmMessage = styled.p`
  color: #1d3557;
  font-size: 12px;
`

const LineupList = ({ match, user, userHasVoted }) => {
  const [userVotes, setUserVotes] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitComplete, setSubmitComplete] = useState('')

  useEffect(() => {
    const votes = match.lineup.map((player, i) => {
      return [
        player.playerId,
        {
          name: `${player.infos.firstName} ${player.infos.lastName}`,
          rating: 5,
          average: player.average,
        },
      ]
    })
    const initVotes = Object.fromEntries(votes)
    setUserVotes(initVotes)
  }, [match])

  const [addUserVotes] = useMutation(ADD_USER_VOTES, {
    onCompleted: () => {
      setSubmitError('')
      setSubmitComplete('Vos votes ont été comptabilisés avec succès.')
    },
    onError: (err) => {
      setSubmitComplete('')
      setSubmitError(err.message)
    },
  })

  const handleVoteSubmit = () => {
    const votes = Object.keys(userVotes).map((key, index) => ({
      playerId: key,
      rating: parseFloat(userVotes[key].rating),
    }))
    addUserVotes({
      variables: {
        matchId: match.id,
        userId: user.id,
        userVotes: votes,
      },
    })
  }

  const handleRating = useCallback((val, playerId) => {
    setUserVotes((votes) => ({
      ...votes,
      [playerId]: {
        ...votes[playerId],
        rating: val,
      },
    }))
  }, [])

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
        <MatchRating>Notes</MatchRating>
      </MatchItem>
      <PlayersList>
        {match.lineup.map((player, i) => (
          <PlayerItem key={player.playerId}>
            <PlayerMain>
              <PlayerName>{`${player.infos.firstName} ${player.infos.lastName}`}</PlayerName>
            </PlayerMain>
            <PlayerRating>
              {match.active && !userHasVoted ? (
                <RatingInput
                  playerId={player.playerId}
                  handleRating={handleRating}
                />
              ) : (
                <PlayerAvg>
                  {(Math.round(player.average * 100) / 100).toFixed(2)}
                </PlayerAvg>
              )}
            </PlayerRating>
          </PlayerItem>
        ))}
      </PlayersList>
      {match.active && !userHasVoted && (
        <ButtonContainer>
          <SubmitButton onClick={handleVoteSubmit}>VOTER</SubmitButton>
          {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
          {submitComplete && <ConfirmMessage>{submitComplete}</ConfirmMessage>}
        </ButtonContainer>
      )}
      {userHasVoted && (
        <ButtonContainer>
          <ConfirmMessage>Vous avaez dejà voté pour ce match.</ConfirmMessage>
        </ButtonContainer>
      )}
    </Container>
  )
}

LineupList.propTypes = {
  match: PropTypes.object,
  user: PropTypes.object,
}

export default LineupList
