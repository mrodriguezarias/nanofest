import { Router } from "express"
import { Team } from "../models"
import { validateRequest } from "../utils/request"

const router = new Router()

router.route("/").get((req, res) => {
  Team.find(req.query)
    .sort("order")
    .then((teams) => res.json(teams))
    .catch((err) => res.status(400).json(`Error: ${err}`))
})

router.route("/").post(validateRequest, (req, res) => {
  const team = new Team(req.body)
  team
    .save()
    .then((team) => res.json(team._id))
    .catch((err) => res.status(400).json(`Error: ${err}`))
})

router.route("/").put(validateRequest, (req, res) => {
  Team.updateMany(req.query, { $set: req.body })
    .then(() => res.json("OK"))
    .catch((err) => res.status(400).json(`Error: ${err}`))
})

router.route("/").delete(validateRequest, (req, res) => {
  Team.deleteMany(req.query)
    .then(() => res.json("OK"))
    .catch((err) => res.status(400).json(`Error: ${err}`))
})

export { router as teamRouter }
export default router
