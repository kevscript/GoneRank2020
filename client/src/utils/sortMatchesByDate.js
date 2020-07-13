export const sortMatchesByDate = (matches, sort = 'ASC') => {
  const sortedMatches = matches.sort((a, b) => {
    const dateA = a.date.split('/').reverse().join('')
    const dateB = b.date.split('/').reverse().join('')
    if (sort === 'DESC') {
      return dateA > dateB ? -1 : dateA < dateB ? 1 : 0
    }
    return dateA > dateB ? 1 : dateA < dateB ? -1 : 0
  })
  return sortedMatches
}
