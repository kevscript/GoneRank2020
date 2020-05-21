const { ApolloError, UserInputError } = require('apollo-server-express')
const Match = require('../models/match')
const { generateMatch } = require('../utils/generateMatch')

module.exports = {
  Query: {},
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
  },
}
