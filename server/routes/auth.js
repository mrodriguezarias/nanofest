import { Router } from "express"

const router = new Router()

router.route("/").get((req, res) => {
  const secretValue = req.query.secret
  const authorized = secretValue === process.env.SECRET
  res.json({ authorized })
})

export { router as authRouter }
export default router
