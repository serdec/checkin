import cuid from 'cuid';
import { getDateString } from '../../../lib/date/date';
import {
  getCurrentBlockers,
  getCurrentTasks,
  getDoingWellFeedback,
  getNeedsImprovementFeedback,
  getPreviousBlockers,
  getPreviousTasks,
} from '../CurrentCheckin/reducer';
const ADD_CHECKIN = 'CHECKINS::ADD_CHECKIN';
const DELETE_CHECKIN = 'CHECKINS::DELETE_CHECKIN';
const LOAD_CHECKINS = 'CHECKINS::LOAD_CHECKINS';

export const addCheckin = ({
  id = cuid(),
  date = getDateString(new Date()),
  user = '',
  teamId = cuid(),
  teamName = teamId,
  tasks = {},
  blockers = {},
  feedbacks = {},
} = {}) => ({
  type: ADD_CHECKIN,
  payload: {
    id,
    date,
    user,
    teamId,
    teamName,
    contributions: {
      tasks,
      blockers,
      feedbacks,
    },
  },
});

export const deleteCheckin = (id) => ({
  type: DELETE_CHECKIN,
  payload: id,
});
export const getLatestCheckin = (state) => {
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
      previousTasks: getPreviousTasks(checkin.contributions),
      currentTasks: getCurrentTasks(checkin.contributions),
      previousBlockers: getPreviousBlockers(checkin.contributions),
      currentBlockers: getCurrentBlockers(checkin.contributions),
      doingWellFeedback: getDoingWellFeedback(checkin.contributions),
      needsImprovementFeedback: getNeedsImprovementFeedback(
        checkin.contributions
      ),
    }));
};

export const checkinsCollectionReducer = (
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
