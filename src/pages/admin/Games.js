import React, { useState, useEffect } from "react"
import { Input } from "../../components"
import { useDispatch, useSelector } from "react-redux"
import { gameActions } from "../../core/game"

const Games = ({ onBack }) => {
  const [name, setName] = useState()
  const [rules, setRules] = useState()
  const [time, setTime] = useState()
  const [order, setOrder] = useState()
  const [creating, setCreating] = useState(false)
  const games = useSelector((state) => state.games.all)
  const editing = useSelector((state) => state.games.editing)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(gameActions.fetchGames(games))
  }, [dispatch, games])

  useEffect(() => {
    const { name, rules, time, order } =
      games.find((game) => game.id === editing) || {}
    setName(name)
    setRules(rules)
    setTime(time)
    setOrder(order)
  }, [editing, games])

  const handleUpdate = async (data) => {
    const currentGame = games.find((game) => game.id === editing) || {}
    const { id, name, rules, time, order } = {
      ...currentGame,
      ...data,
    }
    if (creating && name) {
      dispatch(gameActions.createGame(name, rules, time, order))
      setCreating(false)
    } else if (!creating) {
      dispatch(gameActions.updateGame(id, name, rules, time, order))
    }
  }

  const handleBack = () => {
    dispatch(gameActions.editGame(null))
    setCreating(false)
  }

  return creating || editing ? (
    <>
      <h1 className="title">
        <span onClick={handleBack} className="clicker">
          Juego {name}
        </span>
        {!creating && (
          <label
            onClick={() => dispatch(gameActions.deleteGame(editing))}
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
          name="Reglas"
          initialValue={rules}
          onSubmit={(rules) => handleUpdate({ rules })}
        />
        <Input
          name="Tiempo"
          initialValue={time}
          onSubmit={(time) => handleUpdate({ time })}
        />
        <Input
          name="Orden"
          initialValue={order}
          onSubmit={(order) => handleUpdate({ order })}
        />
      </div>
    </>
  ) : (
    <>
      <h1 className="title">
        <span onClick={onBack} className="clicker">
          Juegos
        </span>
        <label onClick={() => setCreating(true)} className="mini button">
          (+)
        </label>
      </h1>
      {games &&
        games.map(({ id, name }, index) => (
          <h2 key={index}>
            <span
              onClick={() => dispatch(gameActions.editGame(id))}
              className="clicker"
            >
              {name}
            </span>
          </h2>
        ))}
    </>
  )
}

export default Games
