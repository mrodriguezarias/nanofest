const socketUtils = {
  emitActionToClient: ({ socket }, actionType, payload) => {
    socket.emit("action", { type: actionType, payload })
  },
  emitActionToTeam: ({ io }, teamId, actionType, payload) => {
    io.to(teamId).emit("action", { type: actionType, payload })
  },
  broadcastActionToTeam: ({ socket }, teamId, actionType, payload) => {
    socket.broadcast.to(teamId).emit("action", { type: actionType, payload })
  },
  emitActionToEveryone: ({ io }, actionType, payload) => {
    io.emit("action", { type: actionType, payload })
  },
  broadcastActionToEveryone: ({ socket }, actionType, payload) => {
    socket.broadcast.emit("action", { type: actionType, payload })
  },
}

export { socketUtils }
export default socketUtils
