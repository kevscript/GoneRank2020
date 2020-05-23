export const sortMatchesByDate = (matches) => {
  const sortedMatches = matches.sort((a, b) => {
    const dateA = a.date.split('/').reverse().join('')
    const dateB = b.date.split('/').reverse().join('')
    return dateA > dateB ? 1 : dateA < dateB ? -1 : 0
  })
  return sortedMatches
}
