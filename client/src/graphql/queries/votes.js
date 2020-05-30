import { gql } from 'apollo-boost'

export const ADD_USER_VOTES = gql`
  mutation AddUserVotes(
    $matchId: String!
    $userId: String!
    $userVotes: [UserVoteInput!]!
  ) {
    addUserVotes(matchId: $matchId, userId: $userId, userVotes: $userVotes) {
      id
      date
      opponent
      location
      lineup {
        playerId
        ratings {
          userId
          rating
        }
        average
        infos {
          firstName
          lastName
        }
      }
      active
    }
  }
`
