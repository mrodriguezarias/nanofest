import React from "react"
import { Header, Footer } from "../../components"
import Status from "./Status"
import GameArea from "./GameArea"

const Game = () => {
  return (
    <>
      <Header />
      <div id="game">
        <GameArea />
        <Footer />
      </div>
      <Status />
    </>
  )
}

export { Game }
export default Game
