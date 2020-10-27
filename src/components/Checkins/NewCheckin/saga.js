import { all, put, select, takeLatest } from 'redux-saga/effects';
import { addItem, clearNewCheckin } from './list-reducer';
import {
  getPreviousTasksFromCollection,
  getPreviousBlockersFromCollection,
} from '../Collection/reducer';
import {
  blockersLists,
  createNewCheckin,
  getNotCheckedItems,
  tasksLists,
} from './reducer';

export function* loadItems(list, listName) {
  yield all(list.map((element) => put(addItem({ listName, ...element }))));
}

export function* loadPreviousTasks() {
  const previousTasks = yield select(getPreviousTasksFromCollection);
  const activeTasks = getNotCheckedItems(previousTasks);

  yield all([
    loadItems(previousTasks, tasksLists[0]),
    loadItems(activeTasks, tasksLists[1]),
  ]);
}
export function* loadPreviousBlockers() {
  const previousBlockers = yield select(getPreviousBlockersFromCollection);
  const activeBlockers = getNotCheckedItems(previousBlockers);

  yield all([
    loadItems(previousBlockers, blockersLists[0]),
    loadItems(activeBlockers, blockersLists[1]),
  ]);
}

export function* loadPreviousTasksAndBlockers() {
  yield put(clearNewCheckin());
  yield all([loadPreviousTasks(), loadPreviousBlockers()]);
}

export function* watchLoadPreviousTasksAndBlockers() {
  yield takeLatest(createNewCheckin().type, loadPreviousTasksAndBlockers);
}
