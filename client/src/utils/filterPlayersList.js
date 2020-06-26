export const filterPlayersList = (players, isEdit) => {
  return isEdit ? players : players.filter((p) => p.isActive === true)
}
