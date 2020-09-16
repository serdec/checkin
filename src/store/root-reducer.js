import { checkinsCollectionReducer } from '../reducers/checkins/checkinsCollection/checkins-collection';
import { dailyCheckinReducer } from '../reducers/checkins/dailyCheckin/daily-checkin';
import { teamReducer } from '../components/Teams/team-reducer';
import { activeTeamReducer } from '../components/Teams/active-team-reducer';
import { combineReducers } from 'redux';

export const getActiveTeam = ({ activeTeam = '' } = {}) => activeTeam;
export const getTeams = ({ teams = [] } = {}) => teams;
export const getCheckins = ({ checkins = {} } = {}) => checkins;
export const getCurrentCheckin = ({ currentCheckin = {} } = {}) =>
  currentCheckin;

const rootReducer = combineReducers({
  activeTeam: activeTeamReducer,
  teams: teamReducer,
  checkins: checkinsCollectionReducer,
  currentCheckin: dailyCheckinReducer,
});

export default rootReducer;
