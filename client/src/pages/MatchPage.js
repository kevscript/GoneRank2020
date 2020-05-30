import React, { useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_MATCH } from '../graphql/queries/match'
import { ADD_USER_VOTES } from '../graphql/queries/votes'
import RatingInput from '../components/RatingInput'

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MatchItem = styled.div`
  text-decoration: none;
  width: 100%;
  display: flex;
  height: 50px;
  background: #f5f5f5;
  border-bottom: 1px solid #14387f;
`

const MatchInfo = styled.div`
  background: #dbdbdb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #14387f;
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

const MatchRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100%;
  color: #14387f;
  background: #fff;
  border-left: 1px solid #14387f;
`

const PlayersList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const PlayerItem = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  border-bottom: 1px solid #14387f;
`

const PlayerMain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background: #f5f5f5;
`

const PlayerName = styled.span`
  color: #14387f;
`

const PlayerRating = styled.div`
  width: 100px;
  border-left: 1px solid #14387f;
`

const SubmitButton = styled.button`
  width: 90%;
  margin: 1rem auto;
  padding: 1rem 0;
  color: #14387f;
  font-weight: 600;
  text-transform: uppercase;
  border: 1px solid #14387f;
`

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`

const ConfirmMessage = styled.p`
  color: #14387f;
  font-size: 12px;
`

const MatchPage = ({ user }) => {
  const [userVotes, setUserVotes] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitComplete, setSubmitComplete] = useState('')
  const { matchId } = useParams()

  const { loading, error, data: { match } = {} } = useQuery(GET_MATCH, {
    skip: !matchId,
    variables: { id: matchId },
    onCompleted: (res) => {
      const votes = res.match.lineup.map((player, i) => {
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
    },
  })

  const [addUserVotes] = useMutation(ADD_USER_VOTES, {
    onCompleted: () => {
      setSubmitError('')
      setSubmitComplete('Le vote a été comptabilisé.')
    },
    onError: (err) => {
      setSubmitComplete('')
      setSubmitError(err.message)
    },
  })

  const handleRating = (val, playerId) => {
    setUserVotes((votes) => ({
      ...votes,
      [playerId]: {
        ...votes[playerId],
        rating: val,
      },
    }))
  }

  const handleVoteSubmit = () => {
    const votes = Object.keys(userVotes).map((key, index) => ({
      playerId: key,
      rating: parseFloat(userVotes[key].rating),
    }))
    addUserVotes({
      variables: {
        matchId: matchId,
        userId: user.id,
        userVotes: votes,
      },
    })
  }

  if (!matchId) return <p>No match Id</p>
  if (loading) return <h1>Loading...</h1>
  if (error) return <p>{error.message}</p>

  return (
    <Container>
      <MatchItem>
        <MatchInfo>
          <MatchLocation>{match.location === 'home' ? 'H' : 'A'}</MatchLocation>
          <MatchDate>{match.date.slice(0, 5)}</MatchDate>
        </MatchInfo>
        <MatchData>
          <MatchOpponent>{match.opponent}</MatchOpponent>
          <MatchRating>Note / 10</MatchRating>
        </MatchData>
      </MatchItem>
      <PlayersList>
        {match.lineup &&
          match.lineup.map((player, i) => (
            <PlayerItem key={player.playerId}>
              <PlayerMain>
                <PlayerName>{`${player.infos.firstName} ${player.infos.lastName}`}</PlayerName>
              </PlayerMain>
              <PlayerRating>
                <RatingInput
                  playerId={player.playerId}
                  handleRating={handleRating}
                />
              </PlayerRating>
            </PlayerItem>
          ))}
      </PlayersList>
      <SubmitButton onClick={handleVoteSubmit}>VOTER</SubmitButton>
      {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
      {submitComplete && <ConfirmMessage>{submitComplete}</ConfirmMessage>}
    </Container>
  )
}

export default MatchPage
