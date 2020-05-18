import React, { useEffect } from "react"
import { Redirect } from "react-router-dom"
import { storage } from "../utils"

const Reset = () => {
  useEffect(() => {
    storage.save("team")
  }, [])

  return <Redirect to="/" />
}

export { Reset }
export default Reset
