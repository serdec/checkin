import { describe } from 'riteway';
import {
  listReducer,
  addItem,
  deleteItem,
  toggleItem,
  getActiveItems,
} from './list';

const reducer = listReducer();
const addItemToDefaultList = addItem();
const deleteItemFromDefaultList = deleteItem();
const toggleItemInDefaultList = toggleItem();

const newItem = ({ id = '', active = true, value = '' } = {}) => ({
  id,
  active,
  value,
});

const initialState = [];

describe('list', async (assert) => {
  {
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      actual: reducer(),
      expected: initialState,
    });
  }
  {
    assert({
      given: 'an add item action',
      should: 'return the state with the new item',
      actual: reducer(reducer(), addItemToDefaultList(newItem())),
      expected: [newItem()],
    });
  }

  {
    const id = '1';
    const actualState = reducer(reducer(), addItemToDefaultList({ id }));
    assert({
      given: 'the current state',
      should: 'delete the selected item',
      actual: reducer(actualState, deleteItemFromDefaultList(id)),
      expected: reducer(),
    });
  }

  {
    const id = '1';
    const active = false;
    const actualState = reducer(
      reducer(),
      addItemToDefaultList({ id, active })
    );

    assert({
      given: 'a disabled item ',
      should: 'return the new state with the active item',
      actual: reducer(actualState, toggleItemInDefaultList(id)),
      expected: reducer(reducer(), addItemToDefaultList({ id, active: true })),
    });
  }

  {
    const id = '1';
    const active = true;
    const item = newItem({ id, active });
    const actualState = reducer(reducer(), addItemToDefaultList(item));
    assert({
      given: 'an active item ',
      should: 'return a list containing it',
      actual: getActiveItems(actualState),
      expected: [item],
    });
  }
});
