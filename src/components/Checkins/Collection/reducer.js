import cuid from 'cuid';
import { getDateString } from '../../../lib/date/date';
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
export const getLatestCheckin = (checkins = []) => {
  if (checkins.length === 0) return {};
  return checkins[checkins.length - 1];
};

export const getPreviousBlockersFromCollection = (state = []) => {
  const checkin = getLatestCheckin(state);
  return checkin.currentBlockers || [];
};
export const getPreviousTasksFromCollection = (state = []) => {
  const checkin = getLatestCheckin(state);
  return checkin.currentTasks || [];
};

export const loadCheckins = ({ payload = [] } = {}) => ({
  type: LOAD_CHECKINS,
  payload,
});

export const getCheckinsByDay = ({
  checkins = [],
  date = '',
  teamId = addCheckin().teamId,
} = {}) => {
  return checkins.filter(
    (checkin) => checkin.date === date && checkin.teamId === teamId
  );
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
