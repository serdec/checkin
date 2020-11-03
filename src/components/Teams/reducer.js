import cuid from 'cuid';
import { getDateString } from '../../lib/date/date';

const CREATE_TEAM = 'TEAM::CREATE_TEAM';
const DELETE_TEAM = 'TEAM::DELETE_TEAM';
const CHANGE_NAME = 'TEAM::CHANGE_NAME';
const ADD_MEMBER = 'TEAM::ADD_MEMBER';
const ADD_MEMBERS = 'TEAM::ADD_MEMBERS';
const REMOVE_MEMBER = 'TEAM::REMOVE_MEMBER';
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
export const addMember = ({ teamId = '', userId = '' } = {}) => ({
  type: ADD_MEMBER,
  payload: {
    teamId,
    userId,
  },
});
export const addMembers = ({ teamId = '', users = [] } = {}) => ({
  type: ADD_MEMBERS,
  payload: {
    teamId,
    users,
  },
});
export const removeMember = ({ teamId = '', userId = '' } = {}) => ({
  type: REMOVE_MEMBER,
  payload: {
    teamId,
    userId,
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
export const getMembers = (state, teamId) => {
  const [team] = state.items.filter((team) => team.id === teamId);
  return team.members;
};
export const getTeamsVisibility = (state) => state.visible;

/* REDUCER */
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
    case addMember().type:
      return {
        ...state,
        items: state.items.map((team) => {
          if (team.id === payload.teamId) {
            const newMembers = [...team.members, payload.userId];
            return {
              ...team,
              members: newMembers,
            };
          }
          return team;
        }),
      };
    case addMembers().type:
      return {
        ...state,
        items: state.items.map((team) => {
          if (team.id === payload.teamId) {
            const newMembers = [...team.members, ...payload.users];
            return {
              ...team,
              members: newMembers,
            };
          }
          return team;
        }),
      };
    case removeMember().type:
      return {
        ...state,
        items: state.items.map((team) => {
          if (team.id === payload.teamId) {
            const newMembers = team.members.filter(
              (member) => member !== payload.userId
            );
            return {
              ...team,
              members: newMembers,
            };
          }
          return team;
        }),
      };
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
