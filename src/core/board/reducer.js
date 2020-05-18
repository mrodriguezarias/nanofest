import { boardActions } from "./"

const initialState = {
  game: null,
  team: null,
  status: null,
  mode: null,
}

const fetchBoard = (state, { board }) => {
  return { ...state, ...board }
}

const updateBoard = (state, { board }) => {
  return { ...state, ...board }
}

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case boardActions.CL_FETCH_BOARD:
      return fetchBoard(state, action.payload)
    case boardActions.CL_UPDATE_BOARD:
      return updateBoard(state, action.payload)
    default:
      return state
  }
}

export { boardReducer }
export default boardReducer
