import React from "react"
import { Header, Footer } from "../../components"
import Status from "./Status"

const Game = () => {
  return (
    <>
      <Header />
      <div id="game">
        <div className="content"></div>
        <Footer />
      </div>
      <Status />
    </>
  )
}

export { Game }
export default Game
