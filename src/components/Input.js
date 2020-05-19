import React, { useRef, useState, useEffect } from "react"
import { typeUtils } from "../utils"

const Input = ({ name, initialValue, onSubmit, type = null }) => {
  const [value, setValue] = useState("")
  const inputRef = useRef()

  let shouldSubmit = true

  useEffect(() => {
    setValue(castInput(initialValue))
  }, [initialValue])

  useEffect(() => {
    autoExpand()
  }, [value])

  const castInput = (value) => {
    switch (typeUtils.typeOf(value)) {
      case "array":
        return value.join("\n")
      case "undefined":
      case "null":
        return ""
      default:
        return String(value)
    }
  }

  const castOutput = (value) => {
    switch (type || typeUtils.typeOf(initialValue)) {
      case "array":
        return value.split("\n")
      case "number":
        return Number(value)
      default:
        return value
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      inputRef.current.blur()
      return false
    }
  }

  const handleKeyUp = (event) => {
    if (event.key === "Escape") {
      setValue(castInput(initialValue))
      shouldSubmit = false
      inputRef.current.blur()
    }
  }

  const handleSubmit = async () => {
    if (onSubmit && shouldSubmit && value !== initialValue) {
      await onSubmit(castOutput(value))
    }
  }

  const handleFocus = () => {
    shouldSubmit = true
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const autoExpand = () => {
    inputRef.current.style.height = "inherit"
    const height = inputRef.current.scrollHeight - 24
    inputRef.current.style.height = height + "px"
  }

  return (
    <>
      <label htmlFor={name}>{name}</label>
      <textarea
        ref={inputRef}
        id={name}
        name={name}
        onKeyPress={handleKeyPress}
        onKeyUp={handleKeyUp}
        onBlur={handleSubmit}
        onFocus={handleFocus}
        value={value}
        onChange={handleChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        rows={1}
      />
    </>
  )
}

export { Input }
export default Input
