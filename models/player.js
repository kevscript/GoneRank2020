const { Schema, model } = require('mongoose')

const playerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  matchesPlayed: [{
    matchId: { type: String, required: true }
  }]
})

module.exports = model('Player', playerSchema)