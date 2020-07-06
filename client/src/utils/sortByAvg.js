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
    return 0
  }
  if (player.matches.every((m) => m.lineup[0].average == null)) {
    return 0
  }
  const playerAvgs = player.matches.map((m) => m.lineup[0].average)
  const filteredAvgs = playerAvgs.filter(Boolean)
  const sum = filteredAvgs.reduce((acc, curr) => acc + curr, 0)
  return (Math.round((sum / filteredAvgs.length) * 100) / 100).toFixed(2)
}
