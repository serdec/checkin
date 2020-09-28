import { describe } from 'riteway';
import {
  saveCheckinSaga,
  getCheckins,
  saveCheckinSagaSimulateError,
} from './saga';
import * as database from '../../../services/database/database';
import { call, put } from 'redux-saga/effects';
import { addCheckin, loadCheckins } from './checkins-collection-reducer';
import {
  saveCheckin,
  saveCheckinSimulateError,
  reportSaveCheckinError,
  reportSaveCheckinSuccess,
} from './save-checkin-states-reducer';
import { loginUser } from '../../../store/root-reducer';
import { clearCurrentCheckin } from '../CurrentCheckin/reducer';

const newCheckin = ({
  id = '1',
  date = '09/25/2020',
  user = '',
  teamId = 'team',
  teamName = teamId,
  tasks = {},
  blockers = {},
  feedbacks = {},
} = {}) => ({
  id,
  date,
  user,
  teamId,
  teamName,
  tasks,
  blockers,
  feedbacks,
});

describe('checkins saga', async (assert) => {
  {
    const checkin = newCheckin();
    const addCheckinAction = addCheckin(checkin);
    const iterator = saveCheckinSaga(saveCheckin(checkin));
    assert({
      given: 'some user data',
      should: 'send the correct action to save those data',
      expected: call(database.saveCheckin, addCheckinAction),
      actual: iterator.next().value,
    });
  }

  {
    const checkin = newCheckin();
    const iterator = saveCheckinSaga(saveCheckin(checkin));
    iterator.next();
    const errorResponse = { status: 500 };
    assert({
      given: 'the saveCheckinSaga failure',
      should: 'report the failure',
      expected: put(reportSaveCheckinError(checkin)),
      actual: iterator.next(errorResponse).value,
    });
  }

  {
    const checkin = newCheckin();
    const iterator = saveCheckinSagaSimulateError(
      saveCheckinSimulateError(checkin)
    );
    assert({
      given: 'the saveCheckinSagaSimulateError',
      should: 'report the failure',
      expected: put(reportSaveCheckinError(checkin)),
      actual: iterator.next().value,
    });
  }

  {
    const checkin = newCheckin();
    const iterator = saveCheckinSaga(saveCheckin(checkin));
    iterator.next();
    const response = { status: 200 };
    assert({
      given: 'the saveCheckinSaga success',
      should: 'report the success',
      expected: put(reportSaveCheckinSuccess(checkin)),
      actual: iterator.next(response).value,
    });

    assert({
      given: 'the saveCheckinSaga success',
      should: 'save the checkin in the local store',
      expected: put(addCheckin(checkin)),
      actual: iterator.next().value,
    });

    assert({
      given: 'the saveCheckinSaga success',
      should: 'clear the current checkin state',
      expected: put(clearCurrentCheckin()),
      actual: iterator.next().value,
    });
  }

  {
    const loginAction = loginUser();
    const iterator = getCheckins(loginAction);
    const response = { status: 200, payload: [] };
    assert({
      given: 'a user',
      should: 'send the correct action to get his/her data',
      expected: call(database.getCheckins, loginAction.payload),
      actual: iterator.next().value,
    });
    assert({
      given: 'a login action',
      should: 'load the remote checkins',
      expected: put(loadCheckins()),
      actual: iterator.next(response).value,
    });
  }
});
