import { teamActions } from "./"
import { storage, arrayUtils } from "../../utils"

const initialState = {
  all: [],
  current: storage.load("team"),
  editing: null,
}

const fetchTeams = (state, { teams }) => {
  const all = arrayUtils.sortByKey(teams, "order")
  return { ...state, all }
}

const createTeam = (state, { team }) => {
  const all = [...state.all, team]
  const allSorted = arrayUtils.sortByKey(all, "order")
  return { ...state, all: allSorted, editing: team.id }
}

const updateTeam = (state, { team }) => {
  const all = state.all.map((cur) => (cur.id === team.id ? team : cur))
  const allSorted = arrayUtils.sortByKey(all, "order")
  return { ...state, all: allSorted }
}

const deleteTeam = (state, { id }) => {
  const all = state.all.filter((cur) => cur.id !== id)
  return { ...state, all, editing: null }
}

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case teamActions.EDIT_TEAM:
      return { ...state, editing: action.payload.id }
    case teamActions.CL_FETCH_TEAMS:
      return fetchTeams(state, action.payload)
    case teamActions.CL_CREATE_TEAM:
      return createTeam(state, action.payload)
    case teamActions.CL_UPDATE_TEAM:
      return updateTeam(state, action.payload)
    case teamActions.CL_DELETE_TEAM:
      return deleteTeam(state, action.payload)
    default:
      return state
  }
}

export { teamReducer }
export default teamReducer
