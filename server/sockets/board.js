import { dbUtils, socketUtils } from "../utils"
import { Board } from "../models"
import { actionTypes } from "../core/constants"

const fetchBoard = async (connection, { cached }) => {
  if (cached) {
    return
  }
  let board = await dbUtils.findOne(Board)
  if (!board) {
    const defaultBoard = {
      game: null,
      team: null,
      card: null,
      status: "waiting",
      mode: "turns",
      show: null,
    }
    board = await dbUtils.create(Board, defaultBoard)
  }
  socketUtils.emitActionToClient(connection, actionTypes.CL_FETCH_BOARD, {
    board,
  })
}

const updateBoard = async (
  connection,
  { board: { game, team, status, mode, card, show } },
) => {
  const board = await dbUtils.updateOne(
    Board,
    {},
    { game, team, status, mode, card, show },
  )
  socketUtils.emitActionToEveryone(connection, actionTypes.CL_UPDATE_BOARD, {
    board,
  })
}

const resetCounter = (connection) => {
  socketUtils.emitActionToEveryone(connection, actionTypes.CL_RESET_COUNTER)
}

const boardSocketHandlers = {
  SV_FETCH_BOARD: fetchBoard,
  SV_UPDATE_BOARD: updateBoard,
  SV_RESET_COUNTER: resetCounter,
}

export { boardSocketHandlers }
export default boardSocketHandlers
