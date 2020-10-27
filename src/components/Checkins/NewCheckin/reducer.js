import { getActiveTeam } from '../../ActiveTeam/reducer';
import { getTeamName, getTeams } from '../../Teams/reducer';
import { listReducer } from './list-reducer';

const CREATE_NEW_CHECKIN = 'CHECKIN::CREATE_NEW_CHECKIN';

export const DOING_WELL = 0;
export const NEEDS_IMPROVEMENT = 1;

export const previousTasks = 'LIST::PREVIOUS_TASKS';
export const currentTasks = 'LIST::CURRENT_TASKS';
export const previousBlockers = 'LIST::PREVIOUS_BLOCKERS';
export const currentBlockers = 'LIST::CURRENT_BLOCKERS';
export const doingWellFeedback = 'FEEDBACK::DOING_WELL';
export const needsImprovementFeedback = 'FEEDBACK::NEEDS_IMPROVEMENT';

export const tasksLists = [previousTasks, currentTasks];
export const blockersLists = [previousBlockers, currentBlockers];
export const feedbacksFields = [doingWellFeedback, needsImprovementFeedback];

export const getNotCheckedItems = (list = []) =>
  list.filter((el) => !el.checked);
export const getPreviousTasks = (state = {}) => {
  return state.previousTasks;
};
export const getCurrentTasks = (state = {}) => {
  return state.currentTasks;
};

export const getPreviousBlockers = (state = {}) => {
  return state.previousBlockers;
};
export const getCurrentBlockers = (state = {}) => {
  return state.currentBlockers || [];
};
export const getDoingWellFeedback = (state = {}) => {
  return state.doingWellFeedback;
};
export const getNeedsImprovementFeedback = (state = {}) => {
  return state.needsImprovementFeedback;
};

export const createNewCheckin = () => ({
  type: CREATE_NEW_CHECKIN,
});

export const getCheckinInitialData = (state) => ({
  previousTasks: state.previousTasks,
  currentTasks: state.currentTasks,
  previousBlockers: state.previousBlockers,
  currentBlockers: state.currentBlockers,
  doingWellFeedback: state.doingWellFeedback,
  needsImprovementFeedback: state.needsImprovementFeedback,
  teamId: getActiveTeam(state),
  teamName: getTeamName(getTeams(state), getActiveTeam(state)),
});

export const previousTasksReducer = listReducer(previousTasks);
export const currentTasksReducer = listReducer(currentTasks);
export const previousBlockersReducer = listReducer(previousBlockers);
export const currentBlockersReducer = listReducer(currentBlockers);
export const doingWellFeedbackReducer = () => '';
export const needsImprovementFeedbackReducer = () => '';
