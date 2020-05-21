const { ApolloError, UserInputError } = require('apollo-server-express')
const Match = require('../models/match')
const Player = require('../models/player')
const { generateMatch } = require('../utils/generateMatch')

module.exports = {
  Query: {
    matches: async (_, __, req) => {
      if (!req.isAuth) { throw new ApolloError('Unauthorized Request') }
      try {
        const matches = await Match.find()
        return matches
      } catch (err) { throw new ApolloError(err) }
    },
    match: async (_, { id }, req) => {
      if (!req.isAuth) { throw new ApolloError('Unauthorized Request') }
      try {
        const match = await Match.findOne({ id: id })
        if (!match) { throw new ApolloError(`Match with id ${id} doesn't exist in the DB.`)}
        return match
      } catch (err) { throw new ApolloError(err) }
    }
  },
  Mutation: {
    createMatch: async (_, { date, opponent, location, playerIds }, req) => {
      if (!req.isAuth || !req.userRoles.includes('ADMIN')) {
        throw new ApolloError('Unauthorized Request')
      }
      // check if a match is already planned for that date, throw an error if true
      const matchDay = await Match.findOne({ date: date })
      if (matchDay) {
        throw new UserInputError(`A match is already planned for ${date}`)
      }

      // filter all falsy values and holes from playerIds array
      const ids = playerIds.filter(Boolean).filter(() => true)
      // if ids is an empty array, throw an error
      if (ids.length === 0) {
        throw new UserInputError(`Array of Ids is empty`)
      }
      // make a Set of ids to avoid repetition
      const setOfIds = new Set(ids)
      // turn Set back to Array of values
      const idsArr = Array.from(setOfIds)
      const newMatch = await generateMatch(date, opponent, location, idsArr)
      return newMatch
    },
    removeMatch: async (_, { id }, req) => {
      if (!req.isAuth || !req.userRoles.includes('ADMIN')) {
        throw new ApolloError('Unauthorized Request')
      }
      const match = await Match.findOneAndDelete({ id: id })
      if (!match) { throw new ApolloError(`Match with id ${id} not found in DB.`) }
      if (match.lineup.length > 0) {
        const playersPromises = match.lineup.map(player => Player.findOne({ _id: player.playerId }))
        const players = await Promise.all(playersPromises)
        players.filter(p => p !== null).map(player => {
          player.matchesPlayed = player.matchesPlayed.filter(m => m.matchId !== id )
          player.save()
        })
      }
      return match
    }
  },
}
