import { describe } from 'riteway';
import {
  reducer,
  reportSaveCheckinError,
  reportSaveCheckinSuccess,
  saveCheckin,
  saveCheckinSimulateError,
} from './save-checkin-states-reducer';
describe('save checkin states', async (assert) => {
  {
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      expected: { status: 'idle', payload: { type: 'empty' } },
      actual: reducer(),
    });
  }

  {
    const actions = [saveCheckin(), reportSaveCheckinSuccess()];
    assert({
      given: 'a report success action',
      should: 'change the status to success',
      expected: { status: 'success', payload: undefined },
      actual: actions.reduce(reducer, reducer()),
    });
  }
  {
    const actions = [
      saveCheckin(),
      reportSaveCheckinSuccess(),
      saveCheckinSimulateError(),
      reportSaveCheckinError(),
    ];
    assert({
      given: 'a sequence of report success/error actions',
      should: 'change the status to error',
      expected: { status: 'error', payload: undefined },
      actual: actions.reduce(reducer, reducer()),
    });
  }
  {
    const actions = [saveCheckinSimulateError(), reportSaveCheckinError()];
    assert({
      given: 'a simulate error action',
      should: 'change the status to error',
      expected: { status: 'error', payload: undefined },
      actual: actions.reduce(reducer, reducer()),
    });
  }
});
