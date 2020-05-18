const typeUtils = {
  typeOf: (value) => {
    if (Array.isArray(value)) {
      return "array"
    }
    if (value === null) {
      return "null"
    }
    return typeof value
  },
}

export { typeUtils }
export default typeUtils
