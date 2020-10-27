import { checkinsReducer } from '../components/Checkins/Collection/reducer';
import * as saveStatus from '../components/Checkins/Collection/save-checkin-states-reducer';
import { teamReducer } from '../components/Teams/reducer';
import { activeTeamReducer } from '../components/ActiveTeam/reducer';
import { combineReducers } from 'redux';
import {
  previousTasksReducer,
  currentTasksReducer,
  previousBlockersReducer,
  currentBlockersReducer,
  doingWellFeedbackReducer,
  needsImprovementFeedbackReducer,
} from '../components/Checkins/NewCheckin/reducer';

const rootReducer = combineReducers({
  activeTeam: activeTeamReducer,
  teams: teamReducer,
  checkins: checkinsReducer,
  saveStatus: saveStatus.reducer,
  previousTasks: previousTasksReducer,
  currentTasks: currentTasksReducer,
  previousBlockers: previousBlockersReducer,
  currentBlockers: currentBlockersReducer,
  doingWellFeedback: doingWellFeedbackReducer,
  needsImprovementFeedback: needsImprovementFeedbackReducer,
});

export default rootReducer;
