import { Schema, model } from "mongoose"

const boardSchema = new Schema({
  game: String,
  team: String,
  card: String,
  status: String, // one of ("waiting", "playing", "paused", "ended")
  mode: String, // one of ("turns", "pulses")
})

const Board = model("Board", boardSchema)

export { Board }
export default Board
