import { Schema, model } from "mongoose"

const teamSchema = new Schema({
  name: String,
  color: String,
  order: Number,
  members: [String],
  score: { type: Number, default: 0 },
})

const Team = model("Team", teamSchema)

export { Team }
export default Team
