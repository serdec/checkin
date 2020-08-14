const CREATE_TEAM = 'TEAM::CREATE_TEAM';
const DELETE_TEAM = 'TEAM::DELETE_TEAM';
const ADD_MEMBER = 'TEAM::ADD_MEMBER';

export const createTeam = ({
  name = 'my-team',
  owner = 'user1',
  members = [],
  checkIns = [],
} = {}) => ({
  type: CREATE_TEAM,
  payload: {
    name,
    owner,
    members,
    checkIns,
  },
});

export const deleteTeam = (name) => ({
  type: DELETE_TEAM,
  payload: name,
});

export const addMember = ({ teamName = 'my-team', userId = 'user1' } = {}) => ({
  type: ADD_MEMBER,
  payload: {
    teamName,
    userId,
  },
});

export const teamReducer = (state = [], { type = '', payload = {} } = {}) => {
  switch (type) {
    case createTeam().type:
      return [...state, payload];
    case deleteTeam().type:
      return state.filter((team) => team.name != payload);
    case addMember().type:
      return state.map((team) => {
        if (team.name == payload.teamName) {
          const newMembers = [...team.members, payload.userId];
          return {
            ...team,
            members: newMembers,
          };
        }
      });
    default:
      return state;
  }
};
