import { describe } from 'riteway';
import { currentCheckinReducer, clearCurrentCheckin } from './reducer';

describe('current checkin', async (assert) => {
  const initialState = {
    tasks: { previous: [], current: [] },
    blockers: { previous: [], current: [] },
    feedbacks: { doingWell: '', needsImprovement: '' },
  };

  {
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      actual: currentCheckinReducer(),
      expected: initialState,
    });
  }

  {
    const state = {
      tasks: {
        previous: ['first task', 'second task'],
        current: ['third task', 'fourth task'],
      },
      blockers: {
        previous: ['first blocker', 'second blocker'],
        current: ['third blocker', 'fourth blocker'],
      },
      feedback: {
        doingWell: ['doingWell'],
        needsImprovement: ['needsImprovement'],
      },
    };
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      actual: currentCheckinReducer(state, clearCurrentCheckin()),
      expected: currentCheckinReducer(),
    });
  }
});
