import { checkinsReducer } from '../components/Checkins/Collection/reducer';
import * as saveStatus from '../components/Checkins/Collection/save-checkin-states-reducer';
import { teamReducer } from '../components/Teams/reducer';
import { activeTeamReducer } from '../components/ActiveTeam/reducer';
import { combineReducers } from 'redux';
import { listReducer } from '../components/CheckboxForm/reducer';
import feedbackReducer from '../components/Feedback/reducer';
import {
  previousTasks,
  currentTasks,
  previousBlockers,
  currentBlockers,
  doingWellFeedback,
  needsImprovementFeedback,
} from '../components/Checkins/CurrentCheckin/actions-selectors';

const rootReducer = combineReducers({
  activeTeam: activeTeamReducer,
  teams: teamReducer,
  checkins: checkinsReducer,
  saveStatus: saveStatus.reducer,
  previousTasks: listReducer(previousTasks),
  currentTasks: listReducer(currentTasks),
  previousBlockers: listReducer(previousBlockers),
  currentBlockers: listReducer(currentBlockers),
  doingWellFeedback: feedbackReducer(doingWellFeedback),
  needsImprovementFeedback: feedbackReducer(needsImprovementFeedback),
});

export default rootReducer;
