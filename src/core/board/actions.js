const boardActions = {
  CL_FETCH_BOARD: "CL_FETCH_BOARD",
  SV_FETCH_BOARD: "SV_FETCH_BOARD",
  CL_UPDATE_BOARD: "CL_UPDATE_BOARD",
  SV_UPDATE_BOARD: "SV_UPDATE_BOARD",
  fetchBoard: (board) => {
    const cached = !!board.status
    return { type: boardActions.SV_FETCH_BOARD, payload: { cached } }
  },
  updateBoard: (board) => ({
    type: boardActions.SV_UPDATE_BOARD,
    payload: { board },
  }),
}

export { boardActions }
export default boardActions
