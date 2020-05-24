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
          globalAverage
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
          globalAverage
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
          globalAverage
        }
      }
      active
    }
  }
`
