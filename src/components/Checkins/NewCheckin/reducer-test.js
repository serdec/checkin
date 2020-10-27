import { describe } from 'riteway';
import { addItem } from './list-reducer';
import {
  previousTasksReducer,
  currentTasksReducer,
  previousBlockersReducer,
  currentBlockersReducer,
  doingWellFeedbackReducer,
  needsImprovementFeedbackReducer,
  previousTasks,
  doingWellFeedback,
  currentTasks,
  previousBlockers,
  currentBlockers,
  needsImprovementFeedback,
} from './reducer';

const newItem = ({ id = '', checked = false, value = 'NOT_EMPTY' } = {}) => ({
  id,
  checked,
  value,
});

const getListsReducers = () => [
  previousTasksReducer,
  currentTasksReducer,
  previousBlockersReducer,
  currentBlockersReducer,
];
const getLists = () => [
  previousTasks,
  currentTasks,
  previousBlockers,
  currentBlockers,
];
const getFeedbacksReducers = () => [
  doingWellFeedbackReducer,
  needsImprovementFeedbackReducer,
];
const getFeedbacks = () => ({
  doingWellFeedback,
  needsImprovementFeedback,
});

const createInitialState = () => ({
  previousTasks: [],
  currentTasks: [],
  previousBlockers: [],
  currentBlockers: [],
});

const createState = (item = {}) => ({
  previousTasks: [item],
  currentTasks: [item],
  previousBlockers: [item],
  currentBlockers: [item],
});
const createFeedbacksState = (feedback = '') => ({
  doingWellFeedback: feedback,
  needsImprovementFeedback: feedback,
});

describe('new checkin', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'return a valid initial state',
    expected: Object.values(createInitialState()),
    actual: getListsReducers().map((reducer) => reducer()),
  });
  assert({
    given: 'no arguments',
    should: 'return a valid initial state',
    expected: Object.values(createFeedbacksState()),
    actual: getFeedbacksReducers().map((reducer) => reducer()),
  });
  {
    const lists = getLists();
    const reducers = getListsReducers();
    assert({
      given: 'a new item',
      should: 'add it to the specialized lists',
      expected: Object.values(createState(newItem())),
      actual: reducers.map((reducer, index) =>
        reducer(reducer(), addItem({ ...newItem(), listName: lists[index] }))
      ),
    });
  }
});
