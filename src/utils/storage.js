const storage = {
  load: (key, defaultValue = undefined) => {
    try {
      const value = localStorage.getItem(key)
      return value !== undefined ? JSON.parse(value) : defaultValue
    } catch (err) {
      console.error(err)
      return defaultValue
    }
  },
  save: (key, value = undefined) => {
    try {
      if (value === undefined) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (err) {
      console.error(err)
    }
  },
  clear: () => {
    localStorage.clear()
  },
}

export { storage }
export default storage
