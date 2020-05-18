export const validateRequest = (req, res, next) => {
  if (req.headers.authorization !== process.env.SECRET) {
    res.status(403).send("Forbidden")
  } else {
    next()
  }
}
