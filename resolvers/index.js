const { Query: userQuery, Mutation: userMutation , ...userFieldResolvers } = require('./user')

module.exports = {
  Query: {
    hello: () => "Hello World!",
    ...userQuery
  },
  Mutation: {
    ...userMutation
  },
  ...userFieldResolvers
}