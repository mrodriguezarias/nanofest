import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { gameActions } from "../../core/game"
import { teamActions } from "../../core/team"
import { boardActions } from "../../core/board"

const Board = ({ onBack }) => {
  const teams = useSelector((state) => state.teams.all)
  const games = useSelector((state) => state.games.all)
  const board = useSelector((state) => state.board)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(gameActions.fetchGames(games))
    dispatch(teamActions.fetchTeams(teams))
    dispatch(boardActions.fetchBoard(board))
  }, [dispatch, games, teams, board])

  const updateScore = (id, score) => {
    if (board.status === "playing") {
      dispatch(teamActions.updateScore(id, score))
    }
  }

  const resetEverything = () => {
    dispatch(teamActions.resetScores())
    updateBoard({
      status: "waiting",
      game: null,
      team: null,
      card: null,
      show: null,
    })
  }

  const updateBoard = (data) => {
    const newBoard = { ...board, ...data }
    dispatch(boardActions.updateBoard(newBoard))
  }

  const handleStartFinish = () => {
    if (board.status === "playing") {
      updateBoard({ status: "ended" })
    } else {
      updateBoard({ status: "playing" })
    }
  }

  const handlePauseResume = () => {
    if (board.status === "playing") {
      updateBoard({ status: "paused" })
    } else {
      updateBoard({ status: "playing" })
    }
  }

  const handleChangeMode = () => {
    if (board.mode === "turns") {
      updateBoard({ mode: "pulses" })
    } else {
      updateBoard({ mode: "turns" })
    }
  }

  const getDisplayableStatus = (status = board.status) => {
    switch (status) {
      case "waiting":
        return "no iniciada"
      case "playing":
        return "iniciada"
      case "paused":
        return "en pausa"
      case "ended":
        return "finalizada"
      default:
        return ""
    }
  }

  const getDisplayableMode = (mode = board.mode) => {
    switch (mode) {
      case "turns":
        return "por turnos"
      case "pulses":
        return "por pulsos"
      default:
        return ""
    }
  }

  const toggleShow = (what) => {
    const show = board.show === what ? null : what
    updateBoard({ show })
  }

  const game = games.find((game) => game.id === board.game) || {}
  const team = teams.find((team) => team.id === board.team) || {}

  const handleNextGame = () => {
    const curGameIndex = games.findIndex((game) => game.id === board.game)
    const nextGameIndex = (curGameIndex + 1) % games.length
    updateBoard({ game: games[nextGameIndex].id, show: null })
  }

  const handleNextTeam = () => {
    let team = board.team
    if (board.mode === "turns") {
      const curTeamIndex = teams.findIndex((team) => team.id === board.team)
      const nextTeamIndex = (curTeamIndex + 1) % teams.length
      team = teams[nextTeamIndex].id
    } else {
      team = null
    }
    const curCardIndex = game.cards.findIndex((card) => card._id === board.card)
    const nextCardIndex = (curCardIndex + 1) % game.cards.length
    const card = game.cards[nextCardIndex]._id
    updateBoard({ team, card, show: null })
  }

  return (
    <>
      <h1 className="title">
        <span onClick={onBack} className="clicker">
          Tablero
        </span>
      </h1>
      <div className="controls">
        <section>
          <h2>Partida {getDisplayableStatus()}</h2>
          <button
            disabled={!["waiting", "playing"].includes(board.status)}
            onClick={handleStartFinish}
          >
            {board.status === "waiting" ? "Comenzar" : "Finalizar"}
          </button>
          <button
            disabled={!["playing", "paused"].includes(board.status)}
            onClick={handlePauseResume}
          >
            {board.status === "paused" ? "Resumir" : "Pausar"}
          </button>
          <button
            disabled={board.status === "waiting"}
            onClick={resetEverything}
          >
            Reinicializar
          </button>
        </section>
        <section>
          <h2>Juego {game.name}</h2>
          <button
            onClick={handleNextGame}
            disabled={board.status !== "playing"}
          >
            Avanzar al siguiente
          </button>
        </section>
        <section>
          <h2>Tarjetas</h2>
          <button
            onClick={handleNextTeam}
            disabled={!(board.game && board.status === "playing")}
          >
            Avanzar a la siguiente
          </button>
        </section>
        <section>
          <h2>Modo {getDisplayableMode()}</h2>
          <button
            onClick={handleChangeMode}
            disabled={board.status === "waiting"}
          >
            Pasar a{" "}
            {getDisplayableMode(board.mode === "pulses" ? "turns" : "pulses")}
          </button>
        </section>
        <section>
          <h2>Turno</h2>
          <button
            onClick={() => toggleShow("answer")}
            disabled={board.status === "waiting"}
          >
            Mostrar respuesta
          </button>
          <button
            onClick={() => toggleShow("options")}
            disabled={board.status === "waiting"}
          >
            Mostrar opciones
          </button>
          <button
            onClick={() => dispatch(boardActions.resetCounter())}
            disabled={board.status === "waiting"}
          >
            Reiniciar contador
          </button>
        </section>
      </div>
      <div className="teamBoardContainer">
        <div className="teamBoard">
          {teams &&
            teams.map(({ id, name, color, score }, index) => (
              <div key={index} className={`${color}-bg team`}>
                <h1>{name}</h1>
                <p className="score">{score}</p>
                <div className="buttons">
                  <div
                    className="button"
                    onClick={() => updateScore(id, score - 1)}
                  >
                    <span>-</span>
                  </div>
                  <div
                    className="button"
                    onClick={() => updateScore(id, score + 1)}
                  >
                    <span>+</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default Board
