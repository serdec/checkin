import { combineReducers } from 'redux';
import { listReducer } from '../../CheckboxForm/reducer';
import feedbackReducer from '../../Feedback/reducer';

const CLEAR_CURRENT_CHECKIN = 'CHECKIN::CLEAR_CURRENT_CHECKIN';

const previousTasks = 'LIST::PREVIOUS_TASKS';
const currentTasks = 'LIST::CURRENT_TASKS';
const previousBlockers = 'LIST::PREVIOUS_BLOCKERS';
const currentBlockers = 'LIST::CURRENT_BLOCKERS';
const doingWellFeedback = 'FEEDBACK::DOING_WELL';
const needsImprovementFeedback = 'FEEDBACK::NEEDS_IMPROVEMENT';

export const DOING_WELL = 0;
export const NEEDS_IMPROVEMENT = 1;

export const tasksLists = [previousTasks, currentTasks];
export const blockersLists = [previousBlockers, currentBlockers];
export const feedbacksFields = [doingWellFeedback, needsImprovementFeedback];

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

export const getPreviousTasks = (state) => state.tasks.previous;
export const getCurrentTasks = (state) => state.tasks.current;
export const getPreviousBlockers = (state) => state.blockers.previous;
export const getCurrentBlockers = (state) => state.blockers.current;
export const getDoingWellFeedback = (state) => state.feedbacks.doingWell;
export const getNeedsImprovementFeedback = (state) =>
  state.feedbacks.needsImprovement;

export const getTasks = (state) => state.tasks;
export const getBlockers = (state) => state.blockers;
export const getFeedbacks = (state) => state.feedbacks;

export const clearCurrentCheckin = () => ({
  type: CLEAR_CURRENT_CHECKIN,
  payload: {},
});

export const currentCheckinReducer = (
  state = undefined,
  { type = '', payload = {} } = {}
) => {
  switch (type) {
    case clearCurrentCheckin().type:
      return reducer();
  }
  return reducer(state, { type, payload });
};
