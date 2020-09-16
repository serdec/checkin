import { checkinsCollectionReducer } from '../reducers/checkins/checkinsCollection/checkins-collection';
import { dailyCheckinReducer } from '../reducers/checkins/dailyCheckin/daily-checkin';
import { teamReducer } from '../components/Teams/team-reducer';
import { activeTeamReducer } from '../components/Teams/active-team-reducer';
import { combineReducers } from 'redux';

export const getActiveTeam = (state) => state.activeTeam;
export const getTeams = (state) => state.teams;
export const getCheckins = (state) => state.checkins;
export const getCurrentCheckin = (state) => state.currentCheckin;

const rootReducer = combineReducers({
  activeTeam: activeTeamReducer,
  teams: teamReducer,
  checkins: checkinsCollectionReducer,
  currentCheckin: dailyCheckinReducer,
});

export default rootReducer;
