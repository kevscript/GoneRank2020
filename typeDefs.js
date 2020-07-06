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
    matchesPlayed: [PlayerPlayedMatch]
    matches: [Match]
    globalAverage: Float
    isActive: Boolean!
  }

  type MatchPlayerRating {
    userId: String!
    rating: Float!
  }

  type MatchLineupPlayer {
    playerId: String!
    ratings: [MatchPlayerRating]!
    average: Float
    infos: Player
  }

  type Match {
    id: String!
    date: String!
    opponent: String!
    location: String!
    lineup: [MatchLineupPlayer]!
    active: Boolean!
    average: Float
  }

  type AuthData {
    userId: String!
    token: String!
    tokenExpiration: Int
    roles: [String]
  }

  input UserVoteInput {
    playerId: String!
    rating: Float!
  }

  type Query {
    players: [Player]
    player(id: String!): Player
    activePlayers: [Player]
    inactivePlayers: [Player]
    matches: [Match]
    match(id: String!): Match
  }

  type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): AuthData
    addPlayer(firstName: String!, lastName: String!): Player
    removePlayer(id: String!): Player
    removePlayerFromMatch(matchId: String!, playerId: String!): Player
    addPlayerToMatch(matchId: String!, playerId: String!): Player
    createMatch(
      date: String!
      opponent: String!
      location: String!
      playerIds: [String!]!
    ): Match
    removeMatch(id: String!): Match
    addUserVotes(
      matchId: String!
      userId: String!
      userVotes: [UserVoteInput!]!
    ): Match
    removeUserVotes(matchId: String!, userId: String!): Match
    setMatchActive(id: String!): Match
    setAllPlayersActive: [Player]
    togglePlayerActivity(id: String!): Player
  }
`
