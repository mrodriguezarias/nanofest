import React, { useState, useEffect } from "react"
import Admin from "./Admin"
import { authService } from "../../services"
import { storage } from "../../utils"

const AdminContainer = () => {
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    ;(async () => {
      const secretValue = storage.load("secret")
      const authorized = await authService.validateSecret(secretValue)
      setAuthorized(authorized)
    })()
  }, [])

  const handleInputChange = async (event) => {
    if (event.key !== "Enter") {
      return
    }
    const secretValue = event.target.value.trim()
    const authorized = await authService.validateSecret(secretValue)
    if (authorized) {
      setAuthorized(true)
      storage.save("secret", secretValue)
    }
  }

  const renderSecretInput = () => (
    <input
      autoFocus
      placeholder="¿Santo y seña?"
      size={40}
      onKeyUp={handleInputChange}
    />
  )

  return authorized ? <Admin /> : renderSecretInput()
}

export { AdminContainer as Admin }
export default AdminContainer
