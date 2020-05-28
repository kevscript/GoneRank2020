export const sortByAvg = (players) => {
  const sortedPlayers = players.sort((a, b) => {
    const avgA = a.globalAverage
    const avgB = b.globalAverage
    return avgA > avgB ? 1 : avgA < avgB ? -1 : 0
  })
  return sortedPlayers
}
