const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: [String],
  votes: [{
    matchId: { type: String, required: true },
    ratings: [{
      playerId: { type: String, required: true },
      rating: { type: Number, required: true }
    }]
  }]
})

module.exports = model('User', userSchema)