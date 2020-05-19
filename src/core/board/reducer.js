import { boardActions } from "./"

const initialState = {
  game: null,
  team: null,
  status: null,
  mode: null,
  counter: 0,
  show: null,
}

const fetchBoard = (state, { board }) => {
  return { ...state, ...board }
}

const resetCounter = (state) => {
  return { ...state, counter: state.counter + 1 }
}

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case boardActions.CL_FETCH_BOARD:
    case boardActions.CL_UPDATE_BOARD:
      return fetchBoard(state, action.payload)
    case boardActions.CL_RESET_COUNTER:
      return resetCounter(state)
    default:
      return state
  }
}

export { boardReducer }
export default boardReducer
