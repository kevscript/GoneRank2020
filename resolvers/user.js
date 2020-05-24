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
          { expiresIn: '6h' }
        )
        // return authentication data
        return {
          userId: user.id,
          token: token,
          tokenExpiration: 6,
          roles: user.roles,
        }
      } catch (err) {
        throw new ApolloError(err)
      }
    },
    addUserVotes: async (_, { matchId, userId, userVotes }, req) => {
      // check if request is made by an authorized User
      if (!req.isAuth) {
        throw new ApolloError('Unauthorized Request')
      }
      // make sure the user ids are the same in request and variables
      // can only manipulate his own data if not an ADMIN
      if (userId !== req.userId && !req.userRoles.includes('ADMIN')) {
        throw new ApolloError('Unauthorized Request by User')
      }
      // check if User with this id exists in the DB
      const user = await User.findOne({ _id: req.userId })
      if (!user) { 
        throw new ApolloError(`No User with id ${userId} found in DB.`)
      }
      // check if Match with this id exists in the DB.
      const match = await Match.findOne({ id: matchId })
      if (!match) {
        throw new ApolloError(`No match found with id ${matchId} in the DB.`)
      }
      // push a new object to the votes array of the User with his votes data
      user.votes = [...user.votes, { matchId: matchId, ratings: userVotes }]
      user.save()

      // push each vote to its corresponding lineup member
      userVotes.map(vote => {
        const player = match.lineup.find(p => p.playerId === vote.playerId)
        if (player) {
          player.ratings = [...player.ratings, { userId: userId, rating: vote.rating }]
        }
      })
      match.save()
      return match
    },
    removeUserVotes: async (_, { matchId, userId }, req) => {
      if (!req.isAuth) {
        throw new ApolloError('Unauthorized Request')
      }
      // make sure the user ids are the same in request and variables
      // can only manipulate his own data if not an ADMIN
      if (userId !== req.userId && !req.userRoles.includes('ADMIN')) {
        throw new ApolloError('Unauthorized Request by User')
      }
      // check if User with this id exists in the DB
      const user = await User.findOne({ _id: req.userId })
      if (!user) { 
        throw new ApolloError(`No User with id ${userId} found in DB.`)
      }
      // check if Match with this id exists in the DB.
      const match = await Match.findOne({ id: matchId })
      if (!match) {
        throw new ApolloError(`No match found with id ${matchId} in the DB.`)
      }
      // push a new object to the votes array of the User with his votes data
      user.votes = user.votes.filter(vote => vote.matchId !== matchId)
      user.save()
      // filter each ratings array in lineup from this user's votes
      match.lineup.map(member => {
        member.ratings = member.ratings.filter(x => x.userId !== userId)
      })
      match.save()
      return match
    }
  },
}
