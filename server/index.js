import express from "express"
import http from "http"
import socketio from "socket.io"
import socketHandlers from "./sockets"

import "./config/env"
import { appConfig, routeConfig, dbConfig } from "./config"

const app = express()
const server = http.createServer(app)
const io = socketio()
io.attach(server)

appConfig.configureApp(app)
routeConfig.configureRoutes(app)
dbConfig.connect()

server.listen(appConfig.port, appConfig.host, (error) => {
  if (error) {
    console.log("Server error:", error)
  } else {
    console.log(`Server listening @ ${appConfig.host}:${appConfig.port}`)
  }
})

io.on("connection", (socket) => {
  console.log(`User with id ${socket.id} connected`)

  socket.on("action", async (action) => {
    const socketHandler = socketHandlers[action.type]
    if (socketHandler) {
      await socketHandler({ io, socket }, action.payload)
    }
  })
})
