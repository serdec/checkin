import cuid from 'cuid';
import { getDateString } from '../../lib/date/date';

const CREATE_TEAM = 'TEAM::CREATE_TEAM';
const DELETE_TEAM = 'TEAM::DELETE_TEAM';
const CHANGE_NAME = 'TEAM::CHANGE_NAME';
const ADD_USER = 'TEAM::ADD_USER';
const ADD_USERS = 'TEAM::ADD_USERS';
const REMOVE_USERS = 'TEAM::REMOVE_USERS';
const LOAD_TEAMS = 'TEAMS::LOAD_TEAMS';
const TOGGLE_VISIBILITY = 'TEAMS::TOGGLE_VISIBILITY';

const initialState = { visible: false, items: [] };

/* ACTIONS */
export const createTeam = ({
  id = cuid(),
  creationDate = getDateString(new Date()),
  name = '',
  owners = [],
  members = [...owners],
  checkIns = [],
} = {}) => ({
  type: CREATE_TEAM,
  payload: {
    id,
    creationDate,
    name,
    owners,
    members,
    checkIns,
  },
});

export const deleteTeam = (id) => ({
  type: DELETE_TEAM,
  payload: id,
});
export const updateTeam = (team = {}) => ({
  type: CHANGE_NAME,
  payload: team,
});
export const addUser = ({ teamId = '', userId = '', listName = '' } = {}) => ({
  type: ADD_USER,
  payload: {
    teamId,
    users: [userId],
    listName,
  },
});
export const addUsers = ({ teamId = '', users = [], listName = '' } = {}) => ({
  type: ADD_USERS,
  payload: {
    teamId,
    users,
    listName,
  },
});
export const removeUser = ({
  teamId = '',
  userId = '',
  listName = '',
} = {}) => ({
  type: REMOVE_USERS,
  payload: {
    teamId,
    users: [userId],
    listName,
  },
});

export const loadTeams = ({ payload = [] } = {}) => ({
  type: LOAD_TEAMS,
  payload,
});
export const toggleTeamsVisibility = () => ({
  type: TOGGLE_VISIBILITY,
});

/* SELECTORS */
export const getTeams = (state) => state.items;

export const getTeam = (state = initialState, teamId = '') => {
  return { ...state.items.filter((team) => team.id === teamId) };
};
export const getTeamName = (state = initialState, teamId = '') => {
  const teamArr = state.items.filter((team) => team.id === teamId);

  if (teamArr.length === 0) return '';

  return teamArr[0].name;
};
export const getUsers = (state, teamId, listName) => {
  const [team] = state.items.filter((team) => team.id === teamId);
  return team[listName];
};
export const getTeamsVisibility = (state) => state.visible;

/* REDUCER */
const addUsersToList = (state, payload) => {
  const listName = payload.listName;
  return {
    ...state,
    items: state.items.map((team) => {
      if (team.id === payload.teamId) {
        const newUsersList = [...team[listName], ...payload.users];
        return {
          ...team,
          [listName]: newUsersList,
        };
      }
      return team;
    }),
  };
};
const removeUsersFromList = (state, payload) => {
  const listName = payload.listName;
  return {
    ...state,
    items: state.items.map((team) => {
      if (team.id === payload.teamId) {
        const newUsersList = team[listName].filter(
          (user) => !payload.users.includes(user)
        );
        return {
          ...team,
          [listName]: newUsersList,
        };
      }
      return team;
    }),
  };
};

export const teamReducer = (
  state = initialState,
  { type = '', payload = {} } = {}
) => {
  switch (type) {
    case createTeam().type:
      return { ...state, items: [...state.items, payload] };
    case deleteTeam().type:
      return {
        ...state,
        items: state.items.filter((team) => team.id != payload),
      };
    case updateTeam().type:
      return {
        ...state,
        items: state.items.map((team) => {
          if (team.id === payload.id) {
            return {
              ...payload,
            };
          }
          return team;
        }),
      };
    case addUser().type:
    case addUsers().type:
      return addUsersToList(state, payload);
    case removeUser().type:
      return removeUsersFromList(state, payload);
    case loadTeams().type:
      return {
        ...state,
        items: payload,
      };
    case toggleTeamsVisibility().type:
      return {
        ...state,
        visible: !state.visible,
      };
    default:
      return state;
  }
};
