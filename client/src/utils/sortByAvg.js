export const sortByAvg = (players) => {
  const sortedPlayers = players.sort((a, b) => {
    const avgA = playerAverage(a)
    const avgB = playerAverage(b)
    return avgA > avgB ? -1 : avgA < avgB ? 1 : 0
  })
  return sortedPlayers
}

const playerAverage = (player) => {
  if (player.matches.length === 0) {
    return null
  }
  // if array of played matches is only made of matches in which the player doesn't have a rating yet
  if (player.matches.every((m) => m.lineup[0].average == null)) {
    return null
  }
  const playerAvgs = player.matches.map((m) => m.lineup[0].average)
  const filteredAvgs = playerAvgs.filter(Boolean)
  const sum = filteredAvgs.reduce((acc, curr) => acc + curr, 0)
  return (Math.round((sum / filteredAvgs.length) * 100) / 100).toFixed(2)
}
