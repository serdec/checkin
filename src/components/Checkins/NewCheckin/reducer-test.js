import { describe } from 'riteway';
import { setFeedback } from './feedback-reducer';
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

const newFeedback = ({ value = 'some feedback' } = {}) => ({ value });

const getListsReducers = () => [
  previousTasksReducer,
  currentTasksReducer,
  previousBlockersReducer,
  currentBlockersReducer,
];
const getListsNames = () => [
  previousTasks,
  currentTasks,
  previousBlockers,
  currentBlockers,
];
const getFeedbacksReducers = () => [
  doingWellFeedbackReducer,
  needsImprovementFeedbackReducer,
];
const getFeedbacksNames = () => [doingWellFeedback, needsImprovementFeedback];

const createListsInitialState = () => ({
  previousTasks: [],
  currentTasks: [],
  previousBlockers: [],
  currentBlockers: [],
});
const createListsState = (item = {}) => ({
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
  {
    assert({
      given: 'no arguments',
      should: 'return a valid initial state for lists',
      expected: Object.values(createListsInitialState()),
      actual: getListsReducers().map((reducer) => reducer()),
    });
  }
  {
    const lists = getListsNames();
    const reducers = getListsReducers();
    assert({
      given: 'a new item',
      should: 'add it to the specialized lists',
      expected: Object.values(createListsState(newItem())),
      actual: reducers.map((reducer, index) =>
        reducer(reducer(), addItem({ ...newItem(), listName: lists[index] }))
      ),
    });
  }

  assert({
    given: 'no arguments',
    should: 'return a valid initial state for feedbacks',
    expected: Object.values(createFeedbacksState()),
    actual: getFeedbacksReducers().map((reducer) => reducer()),
  });
  {
    const feedbacks = getFeedbacksNames();
    const reducers = getFeedbacksReducers();
    assert({
      given: 'a new feedback',
      should: 'add it to all feedbacks',
      expected: Object.values(createFeedbacksState(newFeedback().value)),
      actual: reducers.map((reducer, index) =>
        reducer(
          reducer(),
          setFeedback({ ...newFeedback(), feedbackName: feedbacks[index] })
        )
      ),
    });
  }
});
