import cuid from 'cuid';
import { all, put, select, takeLatest } from 'redux-saga/effects';
import { describe } from 'riteway';
import { addItem, clearNewCheckin } from './list-reducer';
import {
  getPreviousBlockersFromCollection,
  getPreviousTasksFromCollection,
} from '../Collection/reducer';

import {
  getNotCheckedItems,
  tasksLists,
  blockersLists,
  createNewCheckin,
} from './reducer';
import {
  loadItems,
  loadPreviousBlockers,
  loadPreviousTasks,
  loadPreviousTasksAndBlockers,
  watchLoadPreviousTasksAndBlockers,
} from './saga';

const createTasks = () => [
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
const createBlockers = () => [
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
    const list = [...createTasks(), ...createBlockers()];
    const listName = 'list';
    const iterator = loadItems(list, listName);
    assert({
      given: 'no arguments',
      should: 'dispatch an action to add previous active tasks to current one',
      expected: all(list.map((el) => put(addItem({ listName, ...el })))),
      actual: iterator.next(getNotCheckedItems(createTasks())).value,
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
        loadItems(createTasks(), tasksLists[0]),
        loadItems(getNotCheckedItems(createTasks(), tasksLists[1])),
      ]),
      actual: iterator.next(createTasks()).value,
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
        loadItems(createBlockers(), blockersLists[0]),
        loadItems(getNotCheckedItems(createBlockers(), blockersLists[1])),
      ]),
      actual: iterator.next(createBlockers()).value,
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
