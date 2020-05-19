const objectUtils = {
  replaceKey: (obj, name, newName) => {
    if (!obj || !obj[name]) {
      return obj
    }
    const objCopy = { ...obj }
    delete Object.assign(objCopy, { [newName]: objCopy[name] })[name]
    return objCopy
  },
  isEmpty: (obj) => {
    return Object.keys(obj).length === 0
  },
}

export { objectUtils }
export default objectUtils
