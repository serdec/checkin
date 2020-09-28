import { describe } from 'riteway';
import {
  listReducer,
  addItem,
  deleteItem,
  toggleItem,
  getActiveItems,
} from './reducer';

const reducer = listReducer();

const newItem = ({ id = '', active = true, value = 'NOT_EMPTY' } = {}) => ({
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
      actual: reducer(reducer(), addItem(newItem())),
      expected: [newItem()],
    });
  }

  {
    const id = '1';
    const actualState = reducer(reducer(), addItem({ id }));
    assert({
      given: 'the current state',
      should: 'delete the selected item',
      actual: reducer(actualState, deleteItem({ id })),
      expected: reducer(),
    });
  }

  {
    const id = '1';
    const active = false;
    const actualState = reducer(reducer(), addItem({ id, active }));

    assert({
      given: 'a disabled item ',
      should: 'return the new state with the active item',
      actual: reducer(actualState, toggleItem({ id })),
      expected: reducer(reducer(), addItem({ id, active: true })),
    });
  }

  {
    const id = '1';
    const active = true;
    const item = newItem({ id, active });
    const actualState = reducer(reducer(), addItem(item));
    assert({
      given: 'an active item ',
      should: 'return a list containing it',
      actual: getActiveItems(actualState),
      expected: [item],
    });
  }
});
