import { describe } from 'riteway';
import { getTeams } from './saga';
import * as database from '../../services/database/database';
import { call, put } from 'redux-saga/effects';
import { loadTeams } from './reducer';
import { loginUser } from '../Checkins/Collection/saga';

describe('teams saga', async (assert) => {
  {
    const loginAction = loginUser();
    const iterator = getTeams(loginAction);
    assert({
      given: 'a login action',
      should: 'get the remote teams',
      expected: call(database.getTeams, loginAction.payload),
      actual: iterator.next().value,
    });
    assert({
      given: 'a login action',
      should: 'load the remote teams',
      expected: put(loadTeams()),
      actual: iterator.next({ status: 200, payload: [] }).value,
    });
  }
});
