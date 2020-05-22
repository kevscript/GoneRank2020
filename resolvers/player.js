const { ApolloError, UserInputError } = require('apollo-server-express')
const Player = require('../models/player')
const Match = require('../models/match')

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
        if (!player) { throw new ApolloError(`Player with id ${id} doesn't exist in the DB.`)}
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
  },
  Player: {
    globalAverage: async (player) => {
      if (player.matchesPlayed.length < 1) {
        return 0
      } else {
        const matchPromises = player.matchesPlayed.map(m => Match.findOne({ id: m.matchId }))
        const matches = await Promise.all(matchPromises)
        const averages = matches.map(m => {
          const him = m.lineup.find(p => p.playerId === player.id)
          if (him.ratings.length > 0) {
            const sum = him.ratings.reduce((acc, curr) => acc + curr.rating, 0)
            return parseFloat((sum / him.ratings.length))
          } else { return NaN }
        })
        const filteredAvgs = averages.filter(avg => Number.isNaN(avg) === false)
        const globalAvg = filteredAvgs.reduce((acc, curr) => acc + curr, 0) / filteredAvgs.length
        return parseFloat(globalAvg.toFixed(2))
      }
    }
  }
}