import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { gameActions } from "../../core/game"
import { boardActions } from "../../core/board"

const GameArea = () => {
  const games = useSelector((state) => state.games.all)
  const board = useSelector((state) => state.board)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(gameActions.fetchGames(games))
    dispatch(boardActions.fetchBoard(board))
  }, [dispatch, games, board])

  const game = games.find((game) => game.id === board.game) || {}
  const card = (game.cards || []).find((card) => card._id === board.card) || {}

  return (
    <div className="content">
      {card.question && <h1>{card.question}</h1>}
      {board.show && (
        <div>
          <h3>{board.show === "answer" ? "Respuesta" : "Opciones"}</h3>
          {board.show === "answer" ? (
            <h2>{card.answer}</h2>
          ) : (
            card.choices &&
            card.choices.map((choice, index) => <h2 key={index}>{choice}</h2>)
          )}
        </div>
      )}
    </div>
  )
}

export { GameArea }
export default GameArea
