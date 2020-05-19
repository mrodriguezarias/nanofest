const boardActions = {
  CL_FETCH_BOARD: "CL_FETCH_BOARD",
  SV_FETCH_BOARD: "SV_FETCH_BOARD",
  CL_UPDATE_BOARD: "CL_UPDATE_BOARD",
  CL_RESET_COUNTER: "CL_RESET_COUNTER",
  SV_UPDATE_BOARD: "SV_UPDATE_BOARD",
  SV_RESET_COUNTER: "SV_RESET_COUNTER",
  fetchBoard: (board) => {
    const cached = !!board.status
    return { type: boardActions.SV_FETCH_BOARD, payload: { cached } }
  },
  updateBoard: (board) => ({
    type: boardActions.SV_UPDATE_BOARD,
    payload: { board },
  }),
  resetCounter: () => ({
    type: boardActions.SV_RESET_COUNTER,
  }),
}

export { boardActions }
export default boardActions
