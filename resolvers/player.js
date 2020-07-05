const { ApolloError, UserInputError } = require('apollo-server-express')
const Player = require('../models/player')
const Match = require('../models/match')

module.exports = {
  Query: {
    players: async (_, __, req) => {
      if (!req.isAuth) {
        throw new ApolloError('Unauthorized Request')
      }
      try {
        const players = await Player.find()
        return players
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    player: async (_, { id }, req) => {
      if (!req.isAuth) {
        throw new ApolloError('Unauthorized Request')
      }
      try {
        const player = await Player.findOne({ _id: id })
        if (!player) {
          throw new ApolloError(`Player with id ${id} doesn't exist in the DB.`)
        }
        return player
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    activePlayers: async (_, __, req) => {
      if (!req.isAuth) {
        throw new ApolloError('Unauthorized Request')
      }
      try {
        const activePlayers = await Player.find({ isActive: true })
        return activePlayers
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    inactivePlayers: async (_, __, req) => {
      if (!req.isAuth) {
        throw new ApolloError('Unauthorized Request')
      }
      try {
        const inactivePlayers = await Player.find({ isActive: false })
        return inactivePlayers
      } catch (err) {
        throw new ApolloError(err)
      }
    },
  },
  Mutation: {
    addPlayer: async (_, { firstName, lastName }, req) => {
      if (!req.isAuth || !req.userRoles.includes('ADMIN')) {
        throw new ApolloError('Unauthorized Request')
      }
      try {
        // check if player with this name already exists, throw an error if true
        const exists = await Player.findOne({ firstName, lastName })
        if (exists) {
          throw new UserInputError(
            `${firstName} ${lastName} already exists in the DB.`
          )
        }
        const newPlayer = {
          firstName,
          lastName,
          matchesPlayed: [],
          isActive: true,
        }
        const player = await new Player(newPlayer).save()
        return player
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    removePlayer: async (_, { id }, req) => {
      if (!req.isAuth || !req.userRoles.includes('ADMIN')) {
        throw new ApolloError('Unauthorized Request')
      }
      try {
        const player = await Player.findOneAndDelete({ _id: id })
        if (!player) {
          throw new UserInputError(`Player with id ${id} doesn't exist.`)
        }
        const matchsPromises = player.matchesPlayed.map((m) =>
          Match.findOne({ id: m.matchId })
        )
        const matchs = await Promise.all(matchsPromises)
        matchs
          .filter((p) => p !== null)
          .map((match) => {
            match.lineup = match.lineup.filter((p) => p.playerId !== id)
            match.save()
          })
        return player
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    setAllPlayersActive: async (_, __, req) => {
      if (!req.isAuth || !req.userRoles.includes('ADMIN')) {
        throw new ApolloError('Unauthorized Request')
      }
      try {
        const players = await Player.find()
        players.forEach((player) => {
          player.isActive = true
          player.save()
        })
        return players
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    togglePlayerActivity: async (_, { id }, req) => {
      if (!req.isAuth || !req.userRoles.includes('ADMIN')) {
        throw new ApolloError('Unauthorized Request')
      }
      try {
        const player = await Player.findOne({ _id: id })
        player.isActive = !player.isActive
        player.save()
        return player
      } catch (err) {
        throw new ApolloError(err)
      }
    },
  },
  Player: {
    matchAverages: async (player) => {
      if (player.matchesPlayed.length < 1) {
        return []
      }
      try {
        const matchPromises = player.matchesPlayed.map((m) =>
          Match.findOne({ id: m.matchId })
        )
        const matches = await Promise.all(matchPromises)
        const averages = matches.map((m) => {
          const him = m.lineup.find((p) => p.playerId === player.id)
          if (him.ratings.length > 0) {
            const sum = him.ratings.reduce((acc, curr) => acc + curr.rating, 0)
            return {
              matchId: m.id,
              average: parseFloat(sum / him.ratings.length)
            }
          } else {
            return {
              matchId: m.id,
              average: 0
            }
          }
        })
        return averages
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    globalAverage: async (player) => {
      if (player.matchesPlayed.length < 1) {
        return 0
      }
      try {
        const matchPromises = player.matchesPlayed.map((m) =>
          Match.findOne({ id: m.matchId })
        )
        const matches = await Promise.all(matchPromises)
        const averages = matches.map((m) => {
          const him = m.lineup.find((p) => p.playerId === player.id)
          if (him.ratings.length > 0) {
            const sum = him.ratings.reduce((acc, curr) => acc + curr.rating, 0)
            return parseFloat(sum / him.ratings.length)
          } else {
            return 0
          }
        })
        const filteredAvgs = averages.filter(
          (avg) => Number.isNaN(avg) === false && avg !== 0
        )
        if (filteredAvgs.length === 0) {
          return 0
        }
        const globalAvg =
          filteredAvgs.reduce((acc, curr) => acc + curr, 0) /
          filteredAvgs.length
        return parseFloat(globalAvg.toFixed(2))
      } catch (err) {
        throw new ApolloError(err)
      }
    },
  },
}
