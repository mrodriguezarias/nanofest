const gameActions = {
  EDIT_GAME: "EDIT_GAME",
  CL_FETCH_GAMES: "CL_FETCH_GAMES",
  CL_CREATE_GAME: "CL_CREATE_GAME",
  CL_UPDATE_GAME: "CL_UPDATE_GAME",
  CL_DELETE_GAME: "CL_DELETE_GAME",
  SV_FETCH_GAMES: "SV_FETCH_GAMES",
  SV_CREATE_GAME: "SV_CREATE_GAME",
  SV_UPDATE_GAME: "SV_UPDATE_GAME",
  SV_DELETE_GAME: "SV_DELETE_GAME",
  editGame: (id) => ({
    type: gameActions.EDIT_GAME,
    payload: { id },
  }),
  fetchGames: (games) => {
    const cached = games && games.length > 0
    return { type: gameActions.SV_FETCH_GAMES, payload: { cached } }
  },
  createGame: (name, rules, time, order) => ({
    type: gameActions.SV_CREATE_GAME,
    payload: { name, rules, time, order },
  }),
  updateGame: (id, name, rules, time, order) => ({
    type: gameActions.SV_UPDATE_GAME,
    payload: { id, name, rules, time, order },
  }),
  deleteGame: (id) => ({
    type: gameActions.SV_DELETE_GAME,
    payload: { id },
  }),
}

export { gameActions }
export default gameActions
