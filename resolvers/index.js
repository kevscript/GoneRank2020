const { ApolloError } = require('apollo-server-express')
const { Query: userQuery, Mutation: userMutation , ...userFieldResolvers } = require('./user')

module.exports = {
  Query: {
    hello: (_, __, req) => {
      if (!req.isAuth) { throw new ApolloError('Unanthenticated user - access denied.') }
      return req.userRoles.includes('ADMIN')
        ? "Hello I'm an Admin"
        : req.userRoles.includes('USER')
          ? "Hello, I'm an authenticated User"
          : "Hello, I'm authenticated but I have no roles"
    },
    ...userQuery
  },
  Mutation: {
    ...userMutation
  },
  ...userFieldResolvers
}