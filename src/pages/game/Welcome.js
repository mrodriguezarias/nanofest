import React, { useState, useCallback, useEffect } from "react"
import { Header } from "../../components"
import { zoom, storage } from "../../utils"
import { Game } from "./Game"
import { useDispatch, useSelector } from "react-redux"
import { teamActions } from "../../core/team"

const Welcome = () => {
  const [section, setSection] = useState("welcome")
  const dispatch = useDispatch()
  const teams = useSelector((state) => state.teams.all)

  const fetchTeams = useCallback(async () => {
    dispatch(teamActions.fetchTeams(teams))
  }, [dispatch, teams])

  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])

  useEffect(() => {
    if (storage.load("team")) {
      setSection("game")
    }
  }, [])

  const selectTeam = (id) => {
    storage.save("team", id)
    setSection("game")
  }

  return section === "game" ? (
    <Game />
  ) : (
    <>
      <Header />
      <div id="welcome">
        <div className="step">
          <div className="stepNumber">1</div>
          Ingresa a la sala de Zoom desde{" "}
          <a rel="noopener noreferrer" target="_blank" href={zoom.passUrl}>
            {zoom.url}
          </a>{" "}
          (ID: {zoom.pmi}; clave: {zoom.pass})
        </div>
        <div className="step">
          <div>
            <div className="stepNumber">2</div>
            Elige un equipo para comenzar a jugar!{" "}
            <span className="emoji" role="img" aria-label="">
              😁
            </span>
          </div>
          <div className="teamBoard">
            {teams &&
              teams.map(({ id, name, color, members }, index) => (
                <div
                  key={index}
                  className={`${color}-bg team clicker`}
                  onClick={() => selectTeam(id)}
                >
                  <div className="container">
                    <h1>{name}</h1>
                    <div className="members">
                      {members.map((member, index) => (
                        <h3 key={index}>{member}</h3>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export { Welcome }
export default Welcome
