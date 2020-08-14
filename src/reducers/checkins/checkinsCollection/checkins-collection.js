const ADD_CHECKIN = 'CHECKIN:: ADD_CHECKIN';
const DELETE_CHECKIN = 'CHECKIN:: DELETE_CHECKIN';

export const addCheckin = ({
  id = '',
  date = 0,
  user = 'user1',
  team = 'my-team',
  yesterdayTasks = [],
  yesterdayBlockers = [],
  todayTasks = [],
  todayBlockers = [],
  doingWell = '',
  needsImprovements = '',
} = {}) => ({
  type: ADD_CHECKIN,
  payload: {
    id,
    date,
    user,
    team,
    checkin: {
      yesterday: {
        yesterdayTasks,
        yesterdayBlockers,
      },
      today: {
        todayTasks,
        todayBlockers,
      },
      feedback: {
        doingWell,
        needsImprovements,
      },
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
export const getCheckinByDay = (state, date) => {
  return state.filter((checkin) => checkin.date == date);
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
    default:
      return state;
  }
};
