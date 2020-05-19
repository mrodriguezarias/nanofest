import React, { useState } from "react"
import { Header } from "../../components"
import Teams from "./Teams"
import Games from "./Games"
import Board from "./Board"

const Admin = () => {
  const [section, setSection] = useState(null)

  const renderSection = () => {
    switch (section) {
      case "teams":
        return <Teams onBack={() => setSection()} />
      case "games":
        return <Games onBack={() => setSection()} />
      case "board":
        return <Board onBack={() => setSection()} />
      default:
        return (
          <>
            <h1>
              <span onClick={() => setSection("teams")} className="clicker">
                Equipos
              </span>
            </h1>
            <h1>
              <span onClick={() => setSection("games")} className="clicker">
                Juegos
              </span>
            </h1>
            <h1>
              <span onClick={() => setSection("board")} className="clicker">
                Tablero
              </span>
            </h1>
          </>
        )
    }
  }

  return (
    <>
      <Header />
      <div id="admin">{renderSection()}</div>
    </>
  )
}

export { Admin }
export default Admin
