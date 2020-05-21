const { ApolloError, UserInputError } = require('apollo-server-express')
const Player = require('../models/player')

module.exports = {
  Query: {
    players: async (_, __, req) => {
      if (!req.isAuth) { throw new ApolloError('Unauthorized Request') }
      try {
        const players = await Player.find()
        return players
      } catch (err) { throw new ApolloError(err) }
    },
    player: async (_, { id }, req) => {
      if (!req.isAuth) { throw new ApolloError('Unauthorized Request') }
      try {
        const player = await Player.findOne({ _id: id })
        if (!player) { throw new UserInputError(`Player with id ${id} doesn't exist in the DB.`)}
        return player
      } catch (err) { throw new ApolloError(err) }
    }
  },
  Mutation: {
    addPlayer: async (_, { firstName, lastName }, req) => {
      if (!req.isAuth || !req.userRoles.includes('ADMIN')) { 
        throw new ApolloError('Unauthorized Request')
      }
      try {
        // check if player with this name already exists, throw an error if true
        const exists = await Player.findOne({ firstName, lastName })
        if (exists) { throw new UserInputError(`${firstName} ${lastName} already exists in the DB.`) }
        const newPlayer = { firstName, lastName, matchesPlayed: [] }
        const player = await new Player(newPlayer).save()
        return player
      } catch (err) { throw new ApolloError(err) }
    },
    removePlayer: async (_, { id }, req) => {
      if (!req.isAuth || !req.userRoles.includes('ADMIN')) { 
        throw new ApolloError('Unauthorized Request')
      }
      try {
        const player = await Player.findOneAndDelete({ _id: id })
        if (!player) { throw new UserInputError(`Player with id ${id} doesn't exist.`)}
        return player
      } catch (err) { throw new ApolloError(err) }
    }
  }
}