import cuid from 'cuid';

const ADD_ITEM = 'CHECKIN::ADD_ITEM';
const DELETE_ITEM = 'CHECKIN::DELETE_ITEM';
const TOGGLE_ITEM = 'CHECKIN::TOGGLE_ITEM';

export const addItem = ({ id = cuid(), active = true, value = '' } = {}) => ({
  type: ADD_ITEM,
  payload: {
    id,
    active,
    value,
  },
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});

export const toggleItem = (id) => ({
  type: TOGGLE_ITEM,
  payload: id,
});

export const getActiveItems = (state) => {
  return state.filter((item) => item.active === true);
};

export const getItems = (state) => {
  return state;
};
export const dailyCheckinReducer = (
  state = [],
  { type = '', payload = {} } = {}
) => {
  switch (type) {
    case addItem().type:
      return [
        ...state,
        {
          ...payload,
        },
      ];
    case deleteItem().type:
      return state.filter((item) => item.id !== payload);
    case toggleItem().type:
      return state.map((item) => {
        if (item.id === payload) {
          item.active = !item.active;
        }
        return item;
      });
    default:
      return state;
  }
};
