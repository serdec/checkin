const CLEAR_NEW_CHECKIN = 'CHECKIN::CLEAR_NEW_CHECKIN';
const CREATE_NEW_CHECKIN = 'CHECKIN::CREATE_NEW_CHECKIN';

export const previousTasks = 'LIST::PREVIOUS_TASKS';
export const currentTasks = 'LIST::CURRENT_TASKS';
export const previousBlockers = 'LIST::PREVIOUS_BLOCKERS';
export const currentBlockers = 'LIST::CURRENT_BLOCKERS';
export const doingWellFeedback = 'FEEDBACK::DOING_WELL';
export const needsImprovementFeedback = 'FEEDBACK::NEEDS_IMPROVEMENT';

export const DOING_WELL = 0;
export const NEEDS_IMPROVEMENT = 1;

export const tasksLists = [previousTasks, currentTasks];
export const blockersLists = [previousBlockers, currentBlockers];
export const feedbacksFields = [doingWellFeedback, needsImprovementFeedback];

export const getNotCheckedItems = (list = []) =>
  list.filter((el) => !el.checked);
export const getPreviousTasks = (state = {}) => {
  if (Object.keys(state).length === 0) return [];
  else return state.previousTasks;
};
export const getCurrentTasks = (state = {}) => {
  if (Object.keys(state).length === 0) return [];
  else return state.currentTasks;
};

export const getPreviousBlockers = (state = {}) => {
  if (Object.keys(state).length === 0) return [];
  else return state.previousBlockers;
};
export const getCurrentBlockers = (state = {}) => {
  if (Object.keys(state).length === 0) return [];
  else return state.currentBlockers;
};
export const getDoingWellFeedback = (state = {}) => {
  if (Object.keys(state).length === 0) return [];
  else return state.doingWellFeedback;
};
export const getNeedsImprovementFeedback = (state = {}) => {
  if (Object.keys(state).length === 0) return [];
  else return state.needsImprovementFeedback;
};

export const getTasks = (state) => ({
  previous: state.previousTasks,
  current: state.currentTasks,
});
export const getBlockers = (state) => ({
  previous: state.previousBlockers,
  current: state.currentBlockers,
});
export const getFeedbacks = (state) => ({
  doingWell: state.doingWellFeedback,
  needsImprovement: state.needsImprovementFeedback,
});

export const createNewCheckin = () => ({
  type: CREATE_NEW_CHECKIN,
});
export const clearNewCheckin = () => ({
  type: CLEAR_NEW_CHECKIN,
});
