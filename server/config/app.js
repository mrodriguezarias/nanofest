import compression from "compression"
import express from "express"
import helmet from "helmet"
import cors from "cors"
import { pathConfig } from "./"
import morgan from "morgan"

export const appConfig = {
  // server address
  host: process.env.HOST,
  port: process.env.SERVER_PORT,

  configureApp: (app) => {
    // server address
    app.set("host", appConfig.host)
    app.set("port", appConfig.port)

    // HTTP headers
    app.disable("x-powered-by")
    app.use(helmet.frameguard({ action: "deny" }))
    app.use(helmet.noSniff())
    app.use(helmet.xssFilter())
    app.use(helmet.ieNoOpen())

    // Enable CORS
    app.use(cors())
    // const allowCrossDomain = (req, res, next) => {
    //   const { origin } = req.headers
    //   // if (process.env.ALLOWED_ORIGINS.split(",").includes(origin)) {
    //   res.header("Access-Control-Allow-Origin", "*")
    //   // }
    //   res.header("Access-Control-Allow-Headers", "*")
    //   res.header("Access-Control-Allow-Methods", "*")
    //   next()
    // }
    // app.use(allowCrossDomain)

    // gzip compression
    app.use(compression())

    // Logging
    if (process.env.NODE_ENV === "development") {
      app.use(morgan("combined"))
    }

    // Parse JSON
    app.use(express.json())

    // static files
    app.use(express.static(pathConfig.static, { index: false }))
  },
}
