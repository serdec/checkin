import { checkinsReducer } from '../components/Checkins/Collection/reducer';
import { currentCheckinReducer } from '../components/Checkins/CurrentCheckin/reducer';
import { teamReducer } from '../components/Teams/reducer';
import { activeTeamReducer } from '../components/ActiveTeam/reducer';
import { combineReducers } from 'redux';

const LOAD_STATE = 'LOAD_STATE';
const LOGIN = 'LOGIN';

export const getActiveTeam = (state) => state.activeTeam;
export const getTeams = (state) => state.teams;
export const getCheckins = (state) => state.checkins;
export const getCurrentCheckin = (state) => state.currentCheckin;

export const loadState = ({ payload = [] } = {}) => ({
  type: LOAD_STATE,
  payload,
});

export const loginUser = ({ user = '' } = {}) => ({
  type: LOGIN,
  payload: user,
});

const rootReducer = combineReducers({
  activeTeam: activeTeamReducer,
  teams: teamReducer,
  checkins: checkinsReducer,
  currentCheckin: currentCheckinReducer,
});

export default rootReducer;
