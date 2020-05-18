const objectUtils = {
  replaceKey: (obj, name, newName) => {
    if (!obj || !obj[name]) {
      return obj
    }
    const objCopy = { ...obj }
    delete Object.assign(objCopy, { [newName]: objCopy[name] })[name]
    return objCopy
  },
}

export { objectUtils }
export default objectUtils
