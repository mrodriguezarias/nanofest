import { dbUtils, socketUtils } from "../utils"
import { Game } from "../models"
import { actionTypes } from "../core/constants"

const fetchGames = async (connection, { cached }) => {
  if (cached) {
    return
  }
  const games = await dbUtils.find(Game)
  socketUtils.emitActionToClient(connection, actionTypes.CL_FETCH_GAMES, {
    games,
  })
}

const createGame = async (connection, { name, rules, time, order }) => {
  const game = await dbUtils.create(Game, { name, rules, time, order })
  socketUtils.emitActionToEveryone(connection, actionTypes.CL_CREATE_GAME, {
    game,
  })
}

const updateGame = async (connection, { id, name, rules, time, order }) => {
  const game = await dbUtils.updateOne(
    Game,
    { id },
    { name, rules, time, order },
  )
  socketUtils.emitActionToEveryone(connection, actionTypes.CL_UPDATE_GAME, {
    game,
  })
}

const deleteGame = async (connection, { id }) => {
  await dbUtils.delete(Game, { id })
  socketUtils.emitActionToEveryone(connection, actionTypes.CL_DELETE_GAME, {
    id,
  })
}

const gameSocketHandlers = {
  SV_FETCH_GAMES: fetchGames,
  SV_CREATE_GAME: createGame,
  SV_UPDATE_GAME: updateGame,
  SV_DELETE_GAME: deleteGame,
}

export { gameSocketHandlers }
export default gameSocketHandlers
