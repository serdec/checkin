import { call, put, takeEvery } from 'redux-saga/effects';
import * as database from '../../../services/database/database';
import { addCheckin, loadCheckins } from './checkins-collection-reducer';
import { loginUser } from '../../../store/root-reducer';
import {
  reportSaveCheckinError,
  reportSaveCheckinSuccess,
} from './save-checkin-states-reducer';

export function* saveCheckin(action) {
  try {
    const response = yield call(database.saveCheckin, action);
    if (response.status !== 200) {
      throw new Error('SaveCheckin failed.');
    }
    yield put(reportSaveCheckinSuccess());
  } catch (error) {
    yield put(reportSaveCheckinError(error));
  }
}

export function* getCheckins(action) {
  try {
    let { status, payload } = yield call(database.getCheckins, action.payload);

    if (status !== 200) {
      throw new Error('getCheckins failed!');
    }
    yield put(loadCheckins({ payload }));
  } catch (error) {
    // yield put(reportGetCheckinsError)
  }
}

/******** WATCHERS ***********/

export function* watchGetCheckins() {
  yield takeEvery(loginUser().type, getCheckins);
}

export function* watchSaveCheckin() {
  yield takeEvery([addCheckin().type], saveCheckin);
}
