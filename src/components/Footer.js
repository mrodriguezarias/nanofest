import React from "react"
import { useSelector } from "react-redux"
import { arrayUtils } from "../utils"

const Footer = () => {
  const info = ""
  const teams = useSelector((state) => state.teams.all)
  const teamsByScore = arrayUtils.sortByKey(teams, "score", false)

  return (
    <footer>
      <div className="board">
        <div>
          {teamsByScore.map(({ name, color, members, score }, index) => (
            <div className={`team ${color}-bg`} key={index}>
              <p className="name">{name}</p>
              <p className={members}>{members.join(", ")}</p>
              <p className="score">{score}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="info">
        {info.split("\n\n").map((paragraph, i) => (
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
    </footer>
  )
}

export { Footer }
export default Footer
