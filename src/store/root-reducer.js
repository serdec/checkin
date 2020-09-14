import { checkinsCollectionReducer } from '../reducers/checkins/checkinsCollection/checkins-collection';
import { dailyCheckinReducer } from '../reducers/checkins/dailyCheckin/daily-checkin';
import { teamReducer } from '../components/Teams/team-reducer';
import { activeTeamReducer } from '../components/Teams/active-team-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  activeTeam: activeTeamReducer,
  teams: teamReducer,
  checkins: checkinsCollectionReducer,
  current: dailyCheckinReducer,
});

export default rootReducer;
