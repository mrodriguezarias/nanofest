import { gameActions } from "./"
import { arrayUtils } from "../../utils"

const initialState = {
  all: [],
  current: null,
  editing: null,
}

const fetchGames = (state, { games }) => {
  const all = arrayUtils.sortByKey(games, "order")
  return { ...state, all }
}

const createGame = (state, { game }) => {
  const all = [...state.all, game]
  const allSorted = arrayUtils.sortByKey(all, "order")
  return { ...state, all: allSorted, editing: game.id }
}

const updateGame = (state, { game }) => {
  const all = state.all.map((cur) => (cur.id === game.id ? game : cur))
  const allSorted = arrayUtils.sortByKey(all, "order")
  return { ...state, all: allSorted }
}

const deleteGame = (state, { id }) => {
  const all = state.all.filter((cur) => cur.id !== id)
  return { ...state, all, editing: null }
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case gameActions.EDIT_GAME:
      return { ...state, editing: action.payload.id }
    case gameActions.CL_FETCH_GAMES:
      return fetchGames(state, action.payload)
    case gameActions.CL_CREATE_GAME:
      return createGame(state, action.payload)
    case gameActions.CL_UPDATE_GAME:
      return updateGame(state, action.payload)
    case gameActions.CL_DELETE_GAME:
      return deleteGame(state, action.payload)
    default:
      return state
  }
}

export { gameReducer }
export default gameReducer
