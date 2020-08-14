import { combineReducers } from 'redux';
import { listReducer } from './list';

export const dailyCheckinReducer = combineReducers({
  yesterdayTasks: listReducer('yesterdayTasks'),
  yesterdayBlockers: listReducer('yesterdayBlockers'),
  todayTasks: listReducer('todayTasks'),
  todayBlockers: listReducer('todayBlockers'),
});
