import cuid from 'cuid';
const ADD_TEAM = 'TEAMS:: ADD_TEAM';
const DELETE_TEAM = 'TEAMS:: DELETE_TEAM';

export const addTeam = ({
  id = cuid(),
  name = id,
  img = '',
  creationDate = new Date(),
  users = [],
} = {}) => ({
  type: ADD_TEAM,
  payload: {
    id,
    name,
    img,
    creationDate,
    users,
  },
});

export const deleteTeam = (id) => ({
  type: DELETE_TEAM,
  payload: id,
});

export const teamsCollectionReducer = (
  state = [],
  { type = '', payload = {} } = {}
) => {
  switch (type) {
    case addTeam().type:
      return state.concat({ ...payload });
    case deleteTeam().type:
      return state.filter((team) => team.id !== payload);
    default:
      return state;
  }
};
