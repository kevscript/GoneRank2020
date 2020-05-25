import { gql } from 'apollo-boost'

export const GET_MATCHES = gql`
  query GetMatches {
    matches {
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

export const GET_MATCH = gql`
  query GetMatch($id: String!) {
    match(id: $id) {
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

export const CREATE_MATCH = gql`
  mutation CreateMatch(
    $date: String!
    $opponent: String!
    $location: String!
    $playerIds: [String!]!
  ) {
    createMatch(
      date: $date
      opponent: $opponent
      location: $location
      playerIds: $playerIds
    ) {
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

export const REMOVE_PLAYER_FROM_MATCH = gql`
  mutation RemovePlayerFromMatch($matchId: String!, $playerId: String!) {
    removePlayerFromMatch(matchId: $matchId, playerId: $playerId) {
      _id
      firstName
      lastName
    }
  }
`

export const ADD_PLAYER_TO_MATCH = gql`
  mutation AddPlayerToMatch($matchId: String!, $playerId: String!) {
    addPlayerToMatch(matchId: $matchId, playerId: $playerId) {
      _id
      firstName
      lastName
    }
  }
`
