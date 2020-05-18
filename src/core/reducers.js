import { combineReducers } from "redux"
import { teamReducer } from "./team"
import { gameReducer } from "./game"
import { boardReducer } from "./board"

export default combineReducers({
  teams: teamReducer,
  games: gameReducer,
  board: boardReducer,
})
