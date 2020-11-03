const SET_ACTIVE_TEAM = 'TEAM::SET_ACTIVE_TEAM';

const initialState = { id: '', name: '', owner: '' };
export const setActiveTeam = (team) => ({
  type: SET_ACTIVE_TEAM,
  payload: team,
});

export const getActiveTeam = (state) => state;
export const getActiveTeamId = (state) => state.id;
export const getActiveTeamOwner = (state) => state.owners;

export const activeTeamReducer = (
  state = initialState,
  { type = '', payload = '' } = {}
) => {
  switch (type) {
    case setActiveTeam().type:
      return payload;
    default:
      return state;
  }
};
