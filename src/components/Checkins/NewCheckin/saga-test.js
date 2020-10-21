import cuid from 'cuid';
import { all, put, select, takeLatest } from 'redux-saga/effects';
import { describe } from 'riteway';
import { addItem } from '../../CheckboxForm/reducer';
import {
  getPreviousBlockersFromCollection,
  getPreviousTasksFromCollection,
} from '../Collection/reducer';

import {
  getNotCheckedItems,
  tasksLists,
  blockersLists,
  createNewCheckin,
  clearNewCheckin,
} from './actions-selectors';
import {
  loadItems,
  loadPreviousBlockers,
  loadPreviousTasks,
  loadPreviousTasksAndBlockers,
  watchLoadPreviousTasksAndBlockers,
} from './saga';

const tasks = [
  {
    checked: true,
    id: cuid(),
    value: 'currentTask1',
  },
  {
    checked: false,
    id: cuid(),
    value: 'currentTask2',
  },
];
const blockers = [
  {
    checked: true,
    id: cuid(),
    value: 'currentBlocker1',
  },
  {
    checked: false,
    id: cuid(),
    value: 'currentBlocker2',
  },
];

describe('new checkin saga', async (assert) => {
  {
    const list = [...tasks, ...blockers];
    const listName = 'list';
    const iterator = loadItems(list, listName);
    assert({
      given: 'no arguments',
      should: 'dispatch an action to add previous active tasks to current one',
      expected: all(list.map((el) => put(addItem({ listName, ...el })))),
      actual: iterator.next(getNotCheckedItems(tasks)).value,
    });
  }
  {
    const iterator = loadPreviousTasks();
    assert({
      given: 'no arguments',
      should: 'dispatch an action to get previous tasks',
      expected: select(getPreviousTasksFromCollection),
      actual: iterator.next().value,
    });
    assert({
      given: 'no arguments',
      should: 'dispatch an action to load the tasks',
      expected: all([
        loadItems(tasks, tasksLists[0]),
        loadItems(getNotCheckedItems(tasks, tasksLists[1])),
      ]),
      actual: iterator.next(tasks).value,
    });
  }
  {
    const iterator = loadPreviousBlockers();
    assert({
      given: 'no arguments',
      should: 'dispatch an action to get previous blockers',
      expected: select(getPreviousBlockersFromCollection),
      actual: iterator.next().value,
    });
    assert({
      given: 'no arguments',
      should: 'dispatch an action to add previous blockers',
      expected: all([
        loadItems(blockers, blockersLists[0]),
        loadItems(getNotCheckedItems(blockers, blockersLists[1])),
      ]),
      actual: iterator.next(blockers).value,
    });
  }
  {
    const iterator = loadPreviousTasksAndBlockers();
    assert({
      given: 'no arguments',
      should: 'dispatch an action to clear the current checkin',
      expected: put(clearNewCheckin()),
      actual: iterator.next().value,
    });
    assert({
      given: 'no arguments',
      should: 'dispatch an action to load previous tasks and blockers',
      expected: all([loadPreviousTasks(), loadPreviousBlockers()]),
      actual: iterator.next().value,
    });
  }
  {
    const iterator = watchLoadPreviousTasksAndBlockers();
    assert({
      given: 'a createNewCheckin action',
      should: 'dispatch call the loadPreviousTasksAndBlockers saga',
      expected: takeLatest(
        createNewCheckin().type,
        loadPreviousTasksAndBlockers
      ),
      actual: iterator.next().value,
    });
  }
});
