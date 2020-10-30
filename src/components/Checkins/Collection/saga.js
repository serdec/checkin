import { call, put, takeEvery } from 'redux-saga/effects';
import * as database from '../../../services/database/database';
import { setActiveTeam } from '../../ActiveTeam/reducer';
import { clearNewCheckin } from '../NewCheckin/list-reducer';
import { addCheckin, loadCheckins } from './reducer';
import {
  saveCheckin,
  reportSaveCheckinError,
  reportSaveCheckinSuccess,
} from './save-checkin-states-reducer';

/******** SAVE CHECKINS ***********/
export function* saveCheckinSaga(action) {
  try {
    const addCheckinAction = addCheckin({ ...action.payload });
    const response = yield call(database.saveCheckin, addCheckinAction);

    if (response.status !== 200) {
      throw new Error('SaveCheckin failed.');
    }

    yield put(reportSaveCheckinSuccess({ ...action.payload }));
    yield put(addCheckinAction);
    yield put(clearNewCheckin());
  } catch (error) {
    yield put(reportSaveCheckinError({ ...action.payload }));
  }
}
export function* watchSaveCheckin() {
  yield takeEvery(saveCheckin().type, saveCheckinSaga);
}

/******** GET CHECKINS ***********/
export function* getCheckins(action) {
  console.log('getting Checkins');
  try {
    let { status, payload } = yield call(
      database.getCheckins,
      action.payload.id
    );

    if (status !== 200) {
      throw new Error('getCheckins failed!');
    }
    yield put(loadCheckins({ payload }));
  } catch (error) {
    // yield put(reportGetCheckinsError)
  }
}

export function* watchGetCheckins() {
  yield takeEvery(setActiveTeam().type, getCheckins);
}
