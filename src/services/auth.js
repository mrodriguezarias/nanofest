import { get } from "../utils/request"

const authService = {
  validateSecret: async (secret) => {
    if (!secret) return false
    const result = await get("auth", { secret })
    return result && result.authorized
  },
}

export { authService }
export default authService
