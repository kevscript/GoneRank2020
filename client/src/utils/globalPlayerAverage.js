export const globalPlayerAverage = (averages = []) => {
  if (averages.length === 0) {
    return
  }
  const sum = averages.reduce((acc, curr) => acc + curr.average, 0)
  return (Math.round((sum / averages.length) * 100) / 100).toFixed(2)
}
