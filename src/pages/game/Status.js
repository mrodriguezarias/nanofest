import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { boardActions } from "../../core/board"
import { teamActions } from "../../core/team"
import { arrayUtils } from "../../utils"

const Waiting = () => {
  const [waitingIndex, setWaitingIndex] = useState(0)
  const waitingTexts = [
    "a otros equipos",
    "que termine la cuarentena",
    "que salga la vacuna contra el COVID-19",
    "que salga The Last of Us Part II",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingIndex(
        (waitingIndex) => (waitingIndex + 1) % waitingTexts.length,
      )
    }, 3500)
    return () => clearInterval(interval)
  }, [waitingIndex, waitingTexts.length])

  return <>Esperando {waitingTexts[waitingIndex]}...</>
}

const Status = () => {
  const board = useSelector((state) => state.board)
  const teams = useSelector((state) => state.teams.all)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(boardActions.fetchBoard(board))
    dispatch(teamActions.fetchTeams(teams))
  }, [dispatch, board, teams])

  const renderTitle = () => {
    console.log("board.status", board.status)
    switch (board.status) {
      case "waiting":
        return <Waiting />
      case "paused":
        return "Partida en pausa ☕️"
      case "ended":
        return "Partida finalizada"
      default:
        return null
    }
  }

  const winner = arrayUtils.sortByKey(teams, "score", false)[0] || {}

  return (
    <div className="statusContainer" hidden={board.status === "playing"}>
      <h1>{renderTitle()}</h1>
      {board.status === "ended" && (
        <h2>
          El equipo ganador es el{" "}
          <span className={winner.color}>{winner.name}</span> &thinsp;&mdash;
          Felicitaciones! 🎉
        </h2>
      )}
    </div>
  )
}

export { Status }
export default Status
