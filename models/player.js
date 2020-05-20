const { Schema, model } = require('mongoose')

const playerSchema = new Schema({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  played: [{
    matchId: { type: String, required: true }
  }]
})

module.exports = model('Player', playerSchema)