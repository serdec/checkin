import cuid from 'cuid';

const ADD_ITEM = 'CHECKIN::ADD_ITEM';
const DELETE_ITEM = 'CHECKIN::DELETE_ITEM';
const TOGGLE_ITEM = 'CHECKIN::TOGGLE_ITEM';
const CLEAR_NEW_CHECKIN = 'CHECKIN::CLEAR_NEW_CHECKIN';

const NOT_EMPTY = 'NOT_EMPTY';

export const addItem = ({
  listName = '',
  id = cuid(),
  checked = false,
  value = NOT_EMPTY,
} = {}) => {
  if (value === '') return { type: '' };
  return {
    type: `${ADD_ITEM}_${listName}`,
    payload: {
      id,
      checked,
      value,
    },
  };
};

export const deleteItem = ({ listName = '', id = '' } = {}) => ({
  type: `${DELETE_ITEM}_${listName}`,
  payload: id,
});

export const toggleItem = ({ listName = '', id = '' } = {}) => ({
  type: `${TOGGLE_ITEM}_${listName}`,
  payload: id,
});
export const clearNewCheckin = () => ({
  type: CLEAR_NEW_CHECKIN,
});

export const getCheckedItems = (state) => {
  return state.filter((item) => item.checked === true);
};

export const getItems = (state) => {
  return state;
};
export const listReducer = (listName = '') => (
  state = [],
  { type = '', payload = {} } = {}
) => {
  switch (type) {
    case addItem({ listName }).type: {
      return [
        ...state,
        {
          ...payload,
        },
      ];
    }
    case deleteItem({ listName }).type:
      return state.filter((item) => item.id !== payload);
    case toggleItem({ listName }).type:
      return state.map((item) => {
        if (item.id === payload) {
          item.checked = !item.checked;
        }
        return item;
      });
    case clearNewCheckin().type:
      return [];
    default:
      return state;
  }
};
