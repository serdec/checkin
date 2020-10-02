const SET_ACTIVE_TEAM = 'TEAM::SET_ACTIVE_TEAM';

export const setActiveTeam = (id) => ({
  type: SET_ACTIVE_TEAM,
  payload: id,
});

// export const getActiveTeam = (state = '') => state;

export const activeTeamReducer = (
  state = '',
  { type = '', payload = '' } = {}
) => {
  switch (type) {
    case setActiveTeam().type:
      return payload;
    default:
      return state;
  }
};
