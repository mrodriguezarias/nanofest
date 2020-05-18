import socketUtils from "../utils/socket"
import { actionTypes } from "../core/constants"
import { dbUtils } from "../utils"
import { Team } from "../models"

const fetchTeams = async (connection, { cached }) => {
  if (cached) {
    return
  }
  const teams = await dbUtils.find(Team)
  socketUtils.emitActionToClient(connection, actionTypes.CL_FETCH_TEAMS, {
    teams,
  })
}

const createTeam = async (connection, { name, color, order, members }) => {
  const team = await dbUtils.create(Team, { name, color, order, members })
  socketUtils.emitActionToEveryone(connection, actionTypes.CL_CREATE_TEAM, {
    team,
  })
}

const updateTeam = async (connection, { id, name, color, order, members }) => {
  const team = await dbUtils.updateOne(
    Team,
    { id },
    { name, color, order, members },
  )
  socketUtils.emitActionToEveryone(connection, actionTypes.CL_UPDATE_TEAM, {
    team,
  })
}

const deleteTeam = async (connection, { id }) => {
  await dbUtils.delete(Team, { id })
  socketUtils.emitActionToEveryone(connection, actionTypes.CL_DELETE_TEAM, {
    id,
  })
}

const updateScore = async (connection, { id, score }) => {
  const team = await dbUtils.updateOne(Team, { id }, { score })
  socketUtils.emitActionToEveryone(connection, actionTypes.CL_UPDATE_TEAM, {
    team,
  })
}

const resetScores = async (connection) => {
  const teams = await dbUtils.update(Team, {}, { score: 0 })
  socketUtils.emitActionToEveryone(connection, actionTypes.CL_FETCH_TEAMS, {
    teams,
  })
}

const teamSocketHandlers = {
  SV_FETCH_TEAMS: fetchTeams,
  SV_CREATE_TEAM: createTeam,
  SV_UPDATE_TEAM: updateTeam,
  SV_DELETE_TEAM: deleteTeam,
  SV_UPDATE_SCORE: updateScore,
  SV_RESET_SCORES: resetScores,
}

export { teamSocketHandlers }
export default teamSocketHandlers
