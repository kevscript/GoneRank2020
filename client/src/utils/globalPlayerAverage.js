export const globalPlayerAverage = (matches = []) => {
  if (matches.length === 0) {
    return 0
  }
  const averages = matches.map((match) => match.lineup[0].average)
  const filteredAvgs = averages.filter(Boolean)
  const sum = filteredAvgs.reduce((acc, curr) => acc + curr, 0)
  return (Math.round((sum / filteredAvgs.length) * 100) / 100).toFixed(2)
}
