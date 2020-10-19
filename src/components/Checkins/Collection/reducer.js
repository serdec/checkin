import cuid from 'cuid';
import { getDateString } from '../../../lib/date/date';
import {
  getCurrentBlockers,
  getCurrentTasks,
  getDoingWellFeedback,
  getNeedsImprovementFeedback,
  getPreviousBlockers,
  getPreviousTasks,
} from '../CurrentCheckin/actions-selectors';
const ADD_CHECKIN = 'CHECKINS::ADD_CHECKIN';
const DELETE_CHECKIN = 'CHECKINS::DELETE_CHECKIN';
const LOAD_CHECKINS = 'CHECKINS::LOAD_CHECKINS';

export const addCheckin = ({
  id = cuid(),
  date = getDateString(new Date()),
  user = '',
  teamId = cuid(),
  teamName = teamId,
  previousTasks = [],
  currentTasks = [],
  previousBlockers = [],
  currentBlockers = [],
  doingWellFeedback = '',
  needsImprovementFeedback = '',
} = {}) => ({
  type: ADD_CHECKIN,
  payload: {
    id,
    date,
    user,
    teamId,
    teamName,
    previousTasks,
    currentTasks,
    previousBlockers,
    currentBlockers,
    doingWellFeedback,
    needsImprovementFeedback,
  },
});

export const deleteCheckin = (id) => ({
  type: DELETE_CHECKIN,
  payload: id,
});
export const getLatestCheckin = (state = []) => {
  if (state.length === 0) return {};
  return state[state.length - 1];
};

export const loadCheckins = ({ payload = [] } = {}) => ({
  type: LOAD_CHECKINS,
  payload,
});

const getCheckinId = ({ id = '' }) => {
  return id;
};
const getCheckinUser = ({ user = '' }) => {
  return user;
};

export const getPreviousBlockersFromCollection = (state) => {
  const checkin = getLatestCheckin(state.checkins);
  return checkin.currentBlockers;
};
export const getPreviousTasksFromCollection = (state) => {
  const checkin = getLatestCheckin(state.checkins);
  return checkin.currentTasks;
};

export const getCheckinsByDay = ({
  state = [],
  date = '',
  teamId = addCheckin().teamId,
} = {}) => {
  return state
    .filter((checkin) => checkin.date === date && checkin.teamId === teamId)
    .map((checkin) => ({
      id: getCheckinId(checkin),
      user: getCheckinUser(checkin),
      previousTasks: getPreviousTasks(checkin),
      currentTasks: getCurrentTasks(checkin),
      previousBlockers: getPreviousBlockers(checkin),
      currentBlockers: getCurrentBlockers(checkin),
      doingWellFeedback: getDoingWellFeedback(checkin),
      needsImprovementFeedback: getNeedsImprovementFeedback(checkin),
    }));
};

export const checkinsReducer = (
  state = [],
  { type = '', payload = {} } = {}
) => {
  switch (type) {
    case addCheckin().type:
      return [
        ...state,
        {
          ...payload,
        },
      ];
    case deleteCheckin().type:
      return state.filter((checkin) => checkin.id != payload);
    case loadCheckins().type:
      return payload;
    default:
      return state;
  }
};
