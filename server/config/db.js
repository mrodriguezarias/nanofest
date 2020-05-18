import mongoose from "mongoose"

export const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  options: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },

  connect: () => {
    const url = `mongodb://${dbConfig.user}:${dbConfig.pass}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}?authSource=admin`
    mongoose.connect(url, dbConfig.options)
    const connection = mongoose.connection
    connection.once("open", () => {
      console.log("Connected to database")
    })
  },
}
