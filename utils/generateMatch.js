const Player = require ('../models/player')
const Match = require ('../models/match')

// helper function that adds the new match ID to the player's playedMatches array
// and returns an object that represents an initiated element of the new match lineup
const processId = async (playerId, newMatchId) => {
  try {
    // check if the playerId corresponds to an existing Player
    const player = await Player.findOne({ _id: playerId })
    if (player) {
      // push the newMatch id to the matchesPlayed array on the Player in the db
      player.matchesPlayed = [
        ...player.matchesPlayed,
        { matchId: newMatchId },
      ]
      player.save()
      // returns an object that represents an initialized element of the new match lineup
      return { playerId: player.id, ratings: [] }
    }
  } catch (err) { console.log(err) }
}

// this function returns the new Match object on match creation
const generateMatch = async (date, opponent, location, playerIds) => {
  // init a new match object with a generated match ID
  let newMatch = {
    id: `m-${String(Date.now())}`,
    date,
    location,
    opponent,
    lineup: [],
    active: false,
  }

  // process each player ID and await their results
  const lineupArray = await Promise.all(playerIds.map(id => processId(id, newMatch.id))).then(data => data)
  newMatch.lineup = [...lineupArray]

  const match = await new Match(newMatch).save()
  return match
}

module.exports = { generateMatch }