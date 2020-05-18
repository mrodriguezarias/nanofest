import React, { useState, useEffect } from "react"
import { Input } from "../../components"
import { useDispatch, useSelector } from "react-redux"
import { teamActions } from "../../core/team"

const Teams = ({ onBack }) => {
  const [name, setName] = useState()
  const [color, setColor] = useState()
  const [order, setOrder] = useState()
  const [members, setMembers] = useState()
  const [creating, setCreating] = useState(false)
  const teams = useSelector((state) => state.teams.all)
  const editing = useSelector((state) => state.teams.editing)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(teamActions.fetchTeams(teams))
  }, [dispatch, teams])

  useEffect(() => {
    const { name, color, order, members } =
      teams.find((team) => team.id === editing) || {}
    setName(name)
    setColor(color)
    setOrder(order)
    setMembers(members)
  }, [editing, teams])

  const handleUpdate = async (data) => {
    const currentTeam = teams.find((team) => team.id === editing) || {}
    const { id, name, color, order, members } = {
      ...currentTeam,
      ...data,
    }
    if (creating && name) {
      dispatch(teamActions.createTeam(name, color, order, members))
      setCreating(false)
    } else if (!creating) {
      dispatch(teamActions.updateTeam(id, name, color, order, members))
    }
  }

  const handleBack = () => {
    dispatch(teamActions.editTeam(null))
    setCreating(false)
  }

  return creating || editing ? (
    <>
      <h1 className="title">
        <span onClick={handleBack} className={`${color} clicker`}>
          Equipo {name}
        </span>
        {!creating && (
          <label
            onClick={() => dispatch(teamActions.deleteTeam(editing))}
            className="mini button"
          >
            (-)
          </label>
        )}
      </h1>
      <div className="inputContainer">
        <Input
          name="Nombre"
          initialValue={name}
          onSubmit={(name) => handleUpdate({ name })}
        />
        <Input
          name="Color"
          initialValue={color}
          onSubmit={(color) => handleUpdate({ color })}
        />
        <Input
          name="Orden"
          initialValue={order}
          onSubmit={(order) => handleUpdate({ order })}
        />
        <Input
          name="Integrantes"
          initialValue={members}
          onSubmit={(members) => handleUpdate({ members })}
        />
      </div>
    </>
  ) : (
    <>
      <h1 className="title">
        <span onClick={onBack} className="clicker">
          Equipos
        </span>
        <label onClick={() => setCreating(true)} className="mini button">
          (+)
        </label>
      </h1>
      {teams &&
        teams.map(({ id, name, color }, index) => (
          <h2 key={index}>
            <span
              onClick={() => dispatch(teamActions.editTeam(id))}
              className={`${color} clicker`}
            >
              {name}
            </span>
          </h2>
        ))}
    </>
  )
}

export default Teams
