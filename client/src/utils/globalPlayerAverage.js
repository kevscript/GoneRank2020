export const globalPlayerAverage = (matches = []) => {
  if (matches.length === 0) {
    return 0
  }
  const averages = matches.map((match) =>
    match.lineup[0].average ? match.lineup[0].average : 0
  )
  const filteredAvgs = averages.filter(Boolean)
  if (filteredAvgs.length === 0) {
    return 0
  }
  const sum = filteredAvgs.reduce((acc, curr) => acc + curr, 0)
  return (Math.round((sum / filteredAvgs.length) * 100) / 100).toFixed(2)
}
