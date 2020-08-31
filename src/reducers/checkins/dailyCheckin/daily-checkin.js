import { combineReducers } from 'redux';
import { listReducer } from './list';
import feedbackReducer from './feedback';

export const dailyCheckinReducer = combineReducers({
  yesterdayTasks: listReducer('yesterdayTasks'),
  yesterdayBlockers: listReducer('yesterdayBlockers'),
  todayTasks: listReducer('todayTasks'),
  todayBlockers: listReducer('todayBlockers'),
  doingWellFeedback: feedbackReducer('doingWellFeedback'),
  needsImprovementFeedback: feedbackReducer('needsImprovementFeedback'),
});
