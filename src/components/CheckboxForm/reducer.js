import cuid from 'cuid';

const EMPTY_ITEM = 'CHECKIN::EMPTY_ITEM';
const ADD_ITEM = 'CHECKIN::ADD_ITEM';
const DELETE_ITEM = 'CHECKIN::DELETE_ITEM';
const TOGGLE_ITEM = 'CHECKIN::TOGGLE_ITEM';

const NOT_EMPTY = 'NOT_EMPTY';

export const addItem = (listName = '') => ({
  id = cuid(),
  active = true,
  value = NOT_EMPTY,
} = {}) => {
  if (value === '') return { type: `${EMPTY_ITEM}` };
  return {
    type: `${ADD_ITEM}_${listName}`,
    payload: {
      id,
      active,
      value,
    },
  };
};

export const deleteItem = (listName = '') => (id) => ({
  type: `${DELETE_ITEM}_${listName}`,
  payload: id,
});

export const toggleItem = (listName = '') => (id) => ({
  type: `${TOGGLE_ITEM}_${listName}`,
  payload: id,
});

export const getActiveItems = (state) => {
  return state.filter((item) => item.active === true);
};

export const getItems = (state) => {
  return state;
};
export const listReducer = (listName = '') => (
  state = [],
  { type = '', payload = {} } = {}
) => {
  switch (type) {
    case addItem(listName)().type: {
      return [
        ...state,
        {
          ...payload,
        },
      ];
    }
    case deleteItem(listName)().type:
      return state.filter((item) => item.id !== payload);
    case toggleItem(listName)().type:
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
