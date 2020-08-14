import { describe } from 'riteway';
import {
  dailyCheckinReducer,
  addItem,
  deleteItem,
  toggleItem,
  getActiveItems,
} from './daily-checkin';

const newItem = ({ id = '', active = true, value = '' } = {}) => ({
  id,
  active,
  value,
});

const initialState = [];

describe('dailyCheckin', async (assert) => {
  {
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      actual: dailyCheckinReducer(),
      expected: initialState,
    });
  }
  {
    assert({
      given: 'an add item action',
      should: 'return the state with the new item',
      actual: dailyCheckinReducer(dailyCheckinReducer(), addItem(newItem())),
      expected: [newItem()],
    });
  }

  {
    const id = '1';
    const actualState = dailyCheckinReducer(
      dailyCheckinReducer(),
      addItem({ id })
    );
    assert({
      given: 'the current state',
      should: 'delete the selected item',
      actual: dailyCheckinReducer(actualState, deleteItem(id)),
      expected: dailyCheckinReducer(),
    });
  }

  {
    const id = '1';
    const active = false;
    const actualState = dailyCheckinReducer(
      dailyCheckinReducer(),
      addItem({ id, active })
    );

    assert({
      given: 'a disabled item ',
      should: 'return the new state with the active item',
      actual: dailyCheckinReducer(actualState, toggleItem(id)),
      expected: dailyCheckinReducer(
        dailyCheckinReducer(),
        addItem({ id, active: true })
      ),
    });
  }

  {
    const id = '1';
    const active = true;
    const item = newItem({ id, active });
    const actualState = dailyCheckinReducer(
      dailyCheckinReducer(),
      addItem(item)
    );
    assert({
      given: 'an active item ',
      should: 'return a list containing it',
      actual: getActiveItems(actualState),
      expected: [item],
    });
  }
});
