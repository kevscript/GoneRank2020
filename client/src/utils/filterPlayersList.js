export const filterPlayersList = (players = [], isEdit = false) => {
  return isEdit === true ? players : players.filter((p) => p.isActive === true)
}
