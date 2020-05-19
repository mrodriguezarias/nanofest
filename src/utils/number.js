const numberUtils = {
  zeroPad: (input, length) => {
    return (Array(length + 1).join("0") + String(input)).slice(-length)
  },
}

export { numberUtils }
export default numberUtils
