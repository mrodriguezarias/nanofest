import { teamSocketHandlers } from "./team"
import { gameSocketHandlers } from "./game"
import { boardSocketHandlers } from "./board"

const socketHandlers = {
  ...teamSocketHandlers,
  ...gameSocketHandlers,
  ...boardSocketHandlers,
}

export { teamSocketHandlers } from "./team"
export { gameSocketHandlers } from "./game"
export { boardSocketHandlers } from "./board"

export { socketHandlers }
export default socketHandlers
