require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { ApolloError } = require('apollo-server-express')
const User = require('../models/user')
const Match = require('../models/match')

module.exports = {
  Query: {},
  Mutation: {
    register: async (_, { email, password }) => {
      try {
        // check if email is already used by existing user
        const userExists = await User.findOne({ email: email })
        if (userExists) {
          throw new ApolloError('User already exists.')
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 12)
        // create new User
        const newUser = new User({
          email: email,
          password: hashedPassword,
          roles: ['USER'],
          votes: [],
        })
        // save it to the DB and return its informations
        const user = await newUser.save()
        return {
          _id: user.id,
          email: user.email,
          roles: user.roles,
        }
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    login: async (_, { email, password }) => {
      try {
        // retrieve the user associated to the email
        const user = await User.findOne({ email: email })
        if (!user) {
          throw new ApolloError('Incorrect email or password.')
        }
        // compare the password to the hashed password on the user object
        const isEqualPassword = await bcrypt.compare(password, user.password)
        if (!isEqualPassword) {
          throw new ApolloError('Incorrect password or email.')
        }
        // create a JWT token for authentication
        const token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
            roles: user.roles,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '1h' }
        )
        // return authentication data
        return {
          userId: user.id,
          token: token,
          tokenExpiration: 1,
          roles: user.roles,
        }
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    addUserVotes: async (_, { matchId, userId, userVotes }, req) => {
      if (!req.isAuth) {
        throw new ApolloError('Unauthorized Request')
      }
      try {
        const matchExists = await Match.findOne({ id: matchId })
        if (matchExists) {
          const votesPromises = userVotes.map((vote) => {
            return Match.findOneAndUpdate(
              { id: matchId, 'lineup.playerId': vote.playerId },
              {
                $push: {
                  'lineup.$.ratings': { userId: userId, rating: vote.rating },
                },
              }
            )
          })
          await Promise.all(votesPromises)
          const user = await User.findOne({ _id: req.userId })
          if (user) {
            user.votes = [...user.votes, { matchId: matchId, ratings: userVotes }]
            user.save()
          }
          const match = await Match.findOne({ id: matchId })
          return match
        }
      } catch (err) { throw new ApolloError(err) }
      
    },
  },
}
