import { Schema, model } from "mongoose"

const cardSchema = new Schema({
  question: String,
  answer: String,
  choices: [String],
  category: String,
  order: Number,
})

const gameSchema = new Schema({
  name: String,
  rules: String,
  time: Number,
  order: Number,
  cards: [cardSchema],
})

const Game = model("Game", gameSchema)

export { Game }
export default Game
