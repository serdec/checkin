import { describe } from 'riteway';
import { saveCheckinSaga, getCheckins } from './saga';
import * as database from '../../../services/database/database';
import { call, put } from 'redux-saga/effects';
import { addCheckin, loadCheckins } from './reducer';
import {
  saveCheckin,
  reportSaveCheckinError,
  reportSaveCheckinSuccess,
} from './save-checkin-states-reducer';
import { clearNewCheckin } from '../NewCheckin/list-reducer';
import { setActiveTeam } from '../../Teams/ActiveTeam/reducer';

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
      expected: put(clearNewCheckin()),
      actual: iterator.next().value,
    });
  }

  {
    const teamId = '1';
    const setActiveTeamAction = setActiveTeam(teamId);
    const iterator = getCheckins(setActiveTeamAction);
    const response = { status: 200, payload: [] };
    assert({
      given: 'a user',
      should: 'send the correct action to get his/her data',
      expected: call(database.getCheckins, setActiveTeamAction.payload.id),
      actual: iterator.next().value,
    });
    assert({
      given: 'a set active team action',
      should: 'load the team checkins',
      expected: put(loadCheckins()),
      actual: iterator.next(response).value,
    });
  }
});
