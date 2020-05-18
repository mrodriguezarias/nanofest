import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { teamActions } from "../../core/team"
import { boardActions } from "../../core/board"

const Board = ({ onBack }) => {
  const teams = useSelector((state) => state.teams.all)
  const board = useSelector((state) => state.board)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(teamActions.fetchTeams(teams))
    dispatch(boardActions.fetchBoard(board))
  }, [dispatch, teams, board])

  const updateScore = (id, score) => {
    dispatch(teamActions.updateScore(id, score))
  }

  const resetScores = () => {
    dispatch(teamActions.resetScores())
  }

  const resetEverything = () => {
    resetScores()
    updateBoard({ status: "waiting", game: null, team: null, card: null })
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
            {board.status === "playing" ? "Finalizar" : "Comenzar"}
          </button>
          <button
            disabled={!["playing", "paused"].includes(board.status)}
            onClick={handlePauseResume}
          >
            {board.status === "paused" ? "Resumir" : "Pausar"}
          </button>
        </section>
        <section>
          <h2>Juego {board.game}</h2>
          <button disabled={board.status !== "playing"}>
            Avanzar al siguiente
          </button>
        </section>
        <section>
          <h2>Equipo {board.team}</h2>
          <button disabled={!board.game}>Avanzar al siguiente</button>
        </section>
        <section>
          <h2>Modo {getDisplayableMode()}</h2>
          <button onClick={handleChangeMode}>
            Pasar a{" "}
            {getDisplayableMode(board.mode === "pulses" ? "turns" : "pulses")}
          </button>
        </section>
        <section>
          <h2>Reinicializar</h2>
          <button>Cuenta regresiva</button>
          <button onClick={resetScores}>Puntajes</button>
          <button onClick={resetEverything}>Partida</button>
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
