import { describe } from 'riteway';
import { saveCheckin, getCheckins } from './saga';
import * as database from '../../../services/database/database';
import { call, put } from 'redux-saga/effects';
import { addCheckin, loadCheckins } from './checkins-collection-reducer';
import {
  reportSaveCheckinError,
  reportSaveCheckinSuccess,
} from './save-checkin-states-reducer';
import { loginUser } from '../../../store/root-reducer';

describe('checkins saga', async (assert) => {
  {
    const addCheckinAction = addCheckin();
    const iterator = saveCheckin(addCheckinAction);
    assert({
      given: 'some user data',
      should: 'send the correct action to save those data',
      actual: iterator.next().value,
      expected: call(database.saveCheckin, addCheckinAction),
    });
  }
  {
    const addCheckinAction = addCheckin();
    const iterator = saveCheckin(addCheckinAction);
    const error = new Error('SaveCheckin failed.');
    iterator.next();
    const errorResponse = { status: 500 };
    assert({
      given: 'the saveCheckin failure',
      should: 'report the failure',
      expected: put(reportSaveCheckinError(error)),
      actual: iterator.next(errorResponse).value,
    });
  }
  {
    const addCheckinAction = addCheckin();
    const iterator = saveCheckin(addCheckinAction);
    iterator.next();
    const response = { status: 200 };
    assert({
      given: 'the saveCheckin success',
      should: 'report the success',
      expected: put(reportSaveCheckinSuccess()),
      actual: iterator.next(response).value,
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
