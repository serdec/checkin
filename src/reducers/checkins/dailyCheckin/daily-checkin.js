import { combineReducers } from 'redux';
import { listReducer } from './list';
import feedbackReducer from './feedback';

const CLEAR_CURRENT_CHECKIN = 'CHECKIN::CLEAR_CURRENT_CHECKIN';

const previousTasks = 'LIST::PREVIOUS_TASKS';
const currentTasks = 'LIST::CURRENT_TASKS';
const previousBlockers = 'LIST::PREVIOUS_BLOCKERS';
const currentBlockers = 'LIST::CURRENT_BLOCKERS';
const doingWellFeedback = 'FEEDBACK::DOING_WELL';
const needsImprovementFeedback = 'FEEDBACK::NEEDS_IMPROVEMENT';

export const DOING_WELL = 0;
export const NEEDS_IMPROVEMENT = 1;

export const tasksActions = [previousTasks, currentTasks];
export const blockersActions = [previousBlockers, currentBlockers];
export const feedbacksActions = [doingWellFeedback, needsImprovementFeedback];

const tasksReducers = combineReducers({
  previous: listReducer(previousTasks),
  current: listReducer(currentTasks),
});
const blokersReducers = combineReducers({
  previous: listReducer(previousBlockers),
  current: listReducer(currentBlockers),
});

const feedbacksReducers = combineReducers({
  doingWell: feedbackReducer(doingWellFeedback),
  needsImprovement: feedbackReducer(needsImprovementFeedback),
});

const reducer = combineReducers({
  tasks: tasksReducers,
  blockers: blokersReducers,
  feedbacks: feedbacksReducers,
});

export const getTasks = (state) => state.tasks;
export const getBlockers = (state) => state.blockers;
export const getFeedbacks = (state) => state.feedbacks;

export const clearCurrentCheckin = () => ({
  type: CLEAR_CURRENT_CHECKIN,
  payload: {},
});

export const dailyCheckinReducer = (
  state = undefined,
  { type = '', payload = {} } = {}
) => {
  switch (type) {
    case clearCurrentCheckin().type:
      return reducer();
  }
  return reducer(state, { type, payload });
};
