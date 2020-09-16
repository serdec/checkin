import { combineReducers } from 'redux';
import { listReducer } from './list';
import feedbackReducer from './feedback';

const previousTasks = 'LIST::PREVIOUS_TASKS';
const previousBlockers = 'LIST::PREVIOUS_BLOCKERS';
const currentTasks = 'LIST::CURRENT_TASKS';
const currentBlockers = 'LIST::CURRENT_BLOCKERS';

const doingWellFeedback = 'FEEDBACK::DOING_WELL';
const needsImprovementFeedback = 'FEEDBACK::NEEDS_IMPROVEMENT';

export const tasks = [previousTasks, currentTasks];

export const blockers = [previousBlockers, currentBlockers];

export const feedbacks = [doingWellFeedback, needsImprovementFeedback];

const generateTasksReducers = () =>
  tasks.reduce(
    (obj, el) => ({
      ...obj,
      [el]: listReducer(`${el}`),
    }),
    {}
  );
const generateBlokersReducers = () =>
  blockers.reduce(
    (obj, el) => ({
      ...obj,
      [el]: listReducer(`${el}`),
    }),
    {}
  );
const generateFeedbackReducers = () =>
  feedbacks.reduce(
    (obj, el) => ({ ...obj, [el]: feedbackReducer(`${el}`) }),
    {}
  );

export const dailyCheckinReducer = combineReducers({
  ...generateTasksReducers(),
  ...generateBlokersReducers(),
  ...generateFeedbackReducers(),
});
