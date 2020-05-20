const { Schema, model } = require('mongoose')

const matchSchema = new Schema({
  id: { type: String, required: true },
  date: { type: String, required: true },
  opponent: { type: String, required: true },
  location: { type: String, required: true },
  lineup: [{
    playerId: { type: String, required: true },
    ratings: [{
      userId: { type: String, required: true },
      rating: { type: Number, required: true },
    }]
  }]
})

module.exports = model('Match', matchSchema)