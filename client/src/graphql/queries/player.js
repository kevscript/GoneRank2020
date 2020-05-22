import { gql } from 'apollo-boost'

export const GET_PLAYERS = gql`
  query GetPlayers {
    players {
      _id
      firstName
      lastName
      matchesPlayed {
        matchId
      }
      globalAverage
    }
  }
`

export const GET_PLAYER = gql`
  query GetPlayer($id: String!) {
    player(id: $id) {
      _id
      firstName
      lastName
      matchesPlayed {
        matchId
      }
      globalAverage
    }
  }
`

export const ADD_PLAYER = gql`
  mutation AddPlayer($firstName: String!, $lastName: String!) {
    addPlayer(firstName: $firstName, lastName: $lastName) {
      _id
      firstName
      lastName
      matchesPlayed {
        matchId
      }
      globalAverage
    }
  }
`

export const REMOVE_PLAYER = gql`
  mutation RemovePlayer($id: String!) {
    removePlayer(id: $id) {
      _id
      firstName
      lastName
      matchesPlayed {
        matchId
      }
      globalAverage
    }
  }
`
