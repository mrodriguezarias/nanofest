const teamActions = {
  EDIT_TEAM: "EDIT_TEAM",
  CL_FETCH_TEAMS: "CL_FETCH_TEAMS",
  CL_CREATE_TEAM: "CL_CREATE_TEAM",
  CL_UPDATE_TEAM: "CL_UPDATE_TEAM",
  CL_DELETE_TEAM: "CL_DELETE_TEAM",
  SV_FETCH_TEAMS: "SV_FETCH_TEAMS",
  SV_CREATE_TEAM: "SV_CREATE_TEAM",
  SV_UPDATE_TEAM: "SV_UPDATE_TEAM",
  SV_DELETE_TEAM: "SV_DELETE_TEAM",
  SV_UPDATE_SCORE: "SV_UPDATE_SCORE",
  SV_RESET_SCORES: "SV_RESET_SCORES",
  editTeam: (id) => ({
    type: teamActions.EDIT_TEAM,
    payload: { id },
  }),
  fetchTeams: (teams) => {
    const cached = teams && teams.length > 0
    return { type: teamActions.SV_FETCH_TEAMS, payload: { cached } }
  },
  createTeam: (name, color, order, members) => ({
    type: teamActions.SV_CREATE_TEAM,
    payload: { name, color, order, members },
  }),
  updateTeam: (id, name, color, order, members) => ({
    type: teamActions.SV_UPDATE_TEAM,
    payload: { id, name, color, order, members },
  }),
  deleteTeam: (id) => ({
    type: teamActions.SV_DELETE_TEAM,
    payload: { id },
  }),
  updateScore: (id, score) => ({
    type: teamActions.SV_UPDATE_SCORE,
    payload: { id, score },
  }),
  resetScores: () => ({
    type: teamActions.SV_RESET_SCORES,
  }),
}

export { teamActions }
export default teamActions
