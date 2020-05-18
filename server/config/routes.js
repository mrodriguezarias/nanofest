import express from "express"
import { pathConfig } from "./"
import { authRouter, teamRouter } from "../routes"

export const routeConfig = {
  configureRoutes: (app) => {
    const apiRouter = new express.Router()
    apiRouter.use("/auth", authRouter)
    apiRouter.use("/team", teamRouter)
    app.use("/api", apiRouter)

    const staticRouter = new express.Router()
    const htmlFile = pathConfig.indexHtml
    staticRouter.all("*", (req, res) => {
      res.sendFile(htmlFile)
    })
    app.use(staticRouter)
  },
}
