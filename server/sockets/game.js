import { dbUtils, socketUtils } from "../utils"
import { Game } from "../models"
import { actionTypes } from "../core/constants"
import { objectUtils } from "../utils"

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

const updateCard = async (connection, { gameId, card }) => {
  const game = await dbUtils.findOne(Game, { id: gameId })
  const curCard = game.cards.find((cur) => cur.order === card.order) || {}
  const newCard = {
    ...{ order: game.cards.length + 1 },
    ...curCard,
    ...card,
  }
  let cards
  if (!objectUtils.isEmpty(curCard)) {
    cards = game.cards.map((cur) => (cur.order === card.order ? newCard : cur))
  } else {
    cards = [...game.cards, newCard]
  }
  const newGame = await dbUtils.updateOne(Game, { id: gameId }, { cards })
  socketUtils.emitActionToEveryone(connection, actionTypes.CL_UPDATE_GAME, {
    game: newGame,
    card: newCard,
  })
}

const deleteCard = async (connection, { gameId, card }) => {
  const game = await dbUtils.findOne(Game, { id: gameId })
  const cards = game.cards.filter((cur) => cur.order !== card.order)
  const newGame = await dbUtils.updateOne(Game, { id: gameId }, { cards })
  socketUtils.emitActionToEveryone(connection, actionTypes.CL_UPDATE_GAME, {
    game: newGame,
    card: {},
  })
}

const gameSocketHandlers = {
  SV_FETCH_GAMES: fetchGames,
  SV_CREATE_GAME: createGame,
  SV_UPDATE_GAME: updateGame,
  SV_DELETE_GAME: deleteGame,
  SV_UPDATE_CARD: updateCard,
  SV_DELETE_CARD: deleteCard,
}

export { gameSocketHandlers }
export default gameSocketHandlers
