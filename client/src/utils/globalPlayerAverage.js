export const globalPlayerAverage = (matches = []) => {
  if (matches.length === 0) {
    return 0
  }
  // if the player doesn't have an average rating (probably not rated yet) retur null
  const averages = matches.map((match) =>
    match.lineup[0].average ? match.lineup[0].average : null
  )
  // filter all falsy values from array (rating cant be 0 or null so it means those averages are not made yet, therefore should not count for global average)
  const filteredAvgs = averages.filter(Boolean)
  if (filteredAvgs.length === 0) {
    return null
  }
  const sum = filteredAvgs.reduce((acc, curr) => acc + curr, 0)
  return (Math.round((sum / filteredAvgs.length) * 100) / 100).toFixed(2)
}
