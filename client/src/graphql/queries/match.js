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
      }
      active
    }
  }
`
