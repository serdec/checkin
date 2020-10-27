import { describe } from 'riteway';
import {
  listReducer,
  addItem,
  deleteItem,
  toggleItem,
  getCheckedItems,
} from './list-reducer';

const reducer = listReducer();

const newItem = ({ id = '', checked = false, value = 'NOT_EMPTY' } = {}) => ({
  id,
  checked,
  value,
});

const createState = () => [];

describe('list', async (assert) => {
  {
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      actual: reducer(),
      expected: createState(),
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
    const checked = false;
    const actualState = reducer(reducer(), addItem({ id, checked }));

    assert({
      given: 'a disabled item ',
      should: 'return the new state with the checked item',
      actual: reducer(actualState, toggleItem({ id })),
      expected: reducer(reducer(), addItem({ id, checked: true })),
    });
  }

  {
    const id = '1';
    const checked = true;
    const item = newItem({ id, checked });
    const actualState = reducer(reducer(), addItem(item));
    assert({
      given: 'an checked item ',
      should: 'return a list containing it',
      actual: getCheckedItems(actualState),
      expected: [item],
    });
  }
});
