import cuid from 'cuid';

const CREATE_TEAM = 'TEAM::CREATE_TEAM';
const DELETE_TEAM = 'TEAM::DELETE_TEAM';
const CHANGE_NAME = 'TEAM::CHANGE_NAME';
const ADD_MEMBER = 'TEAM::ADD_MEMBER';
const REMOVE_MEMBER = 'TEAM::REMOVE_MEMBER';

export const createTeam = ({
  id = cuid(),
  creationDate = new Date(),
  name = '',
  owner = '',
  members = [owner],
  checkIns = [],
} = {}) => ({
  type: CREATE_TEAM,
  payload: {
    id,
    creationDate,
    name,
    owner,
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

export const removeMember = ({ teamId = '', userId = '' } = {}) => ({
  type: REMOVE_MEMBER,
  payload: {
    teamId,
    userId,
  },
});

export const getTeam = (state, teamId) => {
  return { ...state.filter((team) => team.id === teamId) };
};

export const getMembers = (state, teamId) => {
  const [team] = state.filter((team) => team.id === teamId);
  return team.members;
};

export const teamReducer = (state = [], { type = '', payload = {} } = {}) => {
  switch (type) {
    case createTeam().type:
      return [...state, payload];
    case deleteTeam().type:
      return state.filter((team) => team.id != payload);
    case updateTeam().type:
      return state.map((team) => {
        if (team.id === payload.id) {
          return {
            ...payload,
          };
        }
        return team;
      });
    case addMember().type:
      return state.map((team) => {
        if (team.id === payload.teamId) {
          const newMembers = [...team.members, payload.userId];
          return {
            ...team,
            members: newMembers,
          };
        }
        return team;
      });
    case removeMember().type:
      return state.map((team) => {
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
      });
    default:
      return state;
  }
};
