import React, { useState } from "react"
import { Input } from "../../components"
import { objectUtils, arrayUtils, numberUtils } from "../../utils"

const Cards = ({
  onBack,
  game,
  editingCard,
  updateCard,
  deleteCard,
  editCard,
}) => {
  const [creating, setCreating] = useState(false)

  const handleUpdate = (data) => {
    const card = {
      ...editingCard,
      ...data,
    }
    if (creating && card.question) {
      updateCard(game.id, card)
      setCreating(false)
    } else if (!creating) {
      updateCard(game.id, card)
    }
  }

  const handleBack = () => {
    editCard({})
    setCreating(false)
  }

  return creating || !objectUtils.isEmpty(editingCard) ? (
    <>
      <h1 className="title">
        <span onClick={handleBack} className="clicker">
          Tarjeta
        </span>
        {!creating && (
          <label
            onClick={() => deleteCard(game.id, editingCard)}
            className="mini button"
          >
            (-)
          </label>
        )}
      </h1>
      <div className="inputContainer">
        <Input
          name="Pregunta"
          initialValue={editingCard.question}
          type="string"
          onSubmit={(question) => handleUpdate({ question })}
        />
        <Input
          name="Respuesta"
          initialValue={editingCard.answer}
          type="string"
          onSubmit={(answer) => handleUpdate({ answer })}
        />
        <Input
          name="Opciones"
          initialValue={editingCard.choices}
          type="array"
          onSubmit={(choices) => handleUpdate({ choices })}
        />
        <Input
          name="Categoria"
          initialValue={editingCard.category}
          type="string"
          onSubmit={(category) => handleUpdate({ category })}
        />
      </div>
    </>
  ) : (
    <div className="cards">
      <h1 className="title">
        <span onClick={onBack} className="clicker">
          Tarjetas de {game.name}
        </span>
        <label onClick={() => setCreating(true)} className="mini button">
          (+)
        </label>
      </h1>
      {game.cards &&
        arrayUtils.sortByKey(game.cards, "order").map((card, index) => (
          <h2 key={index} className="truncate">
            <span onClick={() => editCard(card)} className="clicker">
              {`${numberUtils.zeroPad(index + 1, 2)}. `}
              {card.question}
            </span>
          </h2>
        ))}
    </div>
  )
}

export { Cards }
