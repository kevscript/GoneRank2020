const { gql } = require('apollo-server-express')

module.exports = gql`
  type UserPlayerRating {
    playerId: String!
    rating: Float!
  }

  type UserMatchVote {
    matchId: String!
    ratings: [UserPlayerRating]!
  }

  type User {
    _id: String!
    email: String!
    password: String
    roles: [String]
    votes: [UserMatchVote]
  }

  type PlayerPlayedMatch {
    matchId: String!
  }

  type Player {
    _id: String!
    firstName: String!
    lastName: String!
    played: [PlayerPlayedMatch]!
  }

  type MatchPlayerRating {
    userId: String!
    rating: Float!
  }

  type MatchLineupPlayer {
    playerId: String!
    ratings: [MatchPlayerRating]!
  }

  type Match {
    _id: String!
    date: String!
    opponent: String!
    location: String!
    lineup: [MatchLineupPlayer]!
  }

  type Query {
    hello: String
  }

  type Mutation {
    register(email: String!, password: String!): User
  }
`