const { ApolloError } = require('apollo-server-express')
const { Query: userQuery, Mutation: userMutation , ...userFieldResolvers } = require('./user')
const { Query: playerQuery, Mutation: playerMutation, ...playerFieldResolvers } = require('./player')
const { Query: matchQuery, Mutation: matchMutation, ...matchFieldResolvers } = require ('./match')

module.exports = {
  Query: {
    ...userQuery,
    ...playerQuery,
    ...matchQuery
  },
  Mutation: {
    ...userMutation,
    ...playerMutation,
    ...matchMutation
  },
  ...userFieldResolvers,
  ...playerFieldResolvers,
  ...matchFieldResolvers
}