const bcrypt = require('bcryptjs')
const { ApolloError } = require('apollo-server-express')
const User = require ('../models/user')

module.exports = {
  Query: {},
  Mutation: {
    register: async (_, { email, password }) => {
      try {
        // check if email is already used by existing user
        const userExists = await User.findOne({ email: email })
        if (userExists) { throw new ApolloError('User already exists.') }
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 12)
        // create new User
        const newUser = new User({
          email: email,
          password: hashedPassword,
          roles: ['USER'],
          votes: []
        })
        // save it to the DB and return its informations
        const user = await newUser.save()
        return {
          _id: user.id,
          email: user.email,
          roles: user.roles
        }

      } catch (err) { throw new ApolloError(err) }
    }
  }
}