const objectUtils = {
  replaceKey: (obj, name, newName) => {
    if (!obj) {
      return obj
    }
    const objCopy = { ...obj }
    delete Object.assign(objCopy, { [newName]: objCopy[name] })[name]
    return objCopy
  },
  removeNulls: (obj) => {
    return Object.keys(obj).reduce((accum, cur) => {
      const val = obj[cur]
      if (val !== null && val !== undefined) {
        return { ...accum, [cur]: val }
      }
      return accum
    }, {})
  },
}

export { objectUtils }
export default objectUtils
