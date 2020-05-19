import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { arrayUtils, numberUtils } from "../utils"
import { gameActions } from "../core/game"
import { teamActions } from "../core/team"
import { boardActions } from "../core/board"

const Timer = ({ time, start }) => {
  const [seconds, setSeconds] = useState()

  useEffect(() => {
    setSeconds(time)
  }, [time, start])

  useEffect(() => {
    if (!seconds || !start) {
      return
    }
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds, start])

  return (
    <>{seconds !== undefined ? `:${numberUtils.zeroPad(seconds, 2)}` : ""}</>
  )
}

const Footer = () => {
  const games = useSelector((state) => state.games.all)
  const teams = useSelector((state) => state.teams.all)
  const currentTeamId = useSelector((state) => state.teams.current)
  const board = useSelector((state) => state.board)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(gameActions.fetchGames(games))
    dispatch(teamActions.fetchTeams(teams))
    dispatch(boardActions.fetchBoard(board))
  }, [dispatch, games, teams, board])

  const teamsByScore = arrayUtils.sortByKey(teams, "score", false)
  const game = games.find((game) => game.id === board.game) || {}
  const team = teams.find((team) => team.id === board.team) || {}
  const currentTeam = teams.find((team) => team.id === currentTeamId) || {}
  const card = (game.cards || []).find((card) => card._id === board.card) || {}

  const getCardInfo = () => {
    if (!game.cards || !card.order) {
      return ""
    }
    const curCard = numberUtils.zeroPad(card.order, 2)
    const totalCards = game.cards.length
    return `${curCard}/${totalCards}`
  }

  const handlePulse = () => {
    if (!team.id && card._id) {
      dispatch(boardActions.updateBoard({ ...board, team: currentTeam.id }))
    }
  }

  return (
    <footer>
      <div className="board">
        <div>
          {teamsByScore.map(({ name, color, members, score }, index) => (
            <div className={`team ${color}-bg`} key={index}>
              <p className="name">{name}</p>
              <p className="members">{members.join(", ")}</p>
              <p className="score">{score}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="info">
        <div className="info1">
          <h2>{game.name}</h2>
          {game.rules &&
            game.rules.split("\n\n").map((paragraph, i) => (
              <p key={i}>
                {paragraph.split("\n").map((t, i) => (
                  <React.Fragment key={i}>
                    {t}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            ))}
        </div>
        <div className="info2">
          {board.mode === "pulses" && (
            <section className="pulse">
              <h4>Pulsador</h4>
              <button
                onClick={handlePulse}
                className={`${currentTeam.color}-bg`}
              >
                &nbsp;
              </button>
            </section>
          )}
          <section>
            <h4>Equipo</h4>
            <h3 className={team.color}>{team.name}</h3>
          </section>
          <section>
            <h4>Contador</h4>
            <h3>
              <Timer
                time={game.time}
                start={
                  team.name &&
                  card.order &&
                  `${team.name}${card.order}${board.counter}`
                }
              />
            </h3>
          </section>
          <section>
            <h4>Tarjeta</h4>
            <h3>{getCardInfo()}</h3>
          </section>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
export default Footer
