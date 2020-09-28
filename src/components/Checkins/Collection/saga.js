import { call, put, takeEvery } from 'redux-saga/effects';
import * as database from '../../../services/database/database';
import { addCheckin, loadCheckins } from './checkins-collection-reducer';
import { loginUser } from '../../../store/root-reducer';
import {
  saveCheckin,
  saveCheckinSimulateError,
  reportSaveCheckinError,
  reportSaveCheckinSuccess,
} from './save-checkin-states-reducer';
import { clearCurrentCheckin } from '../CurrentCheckin/reducer';

export function* saveCheckinSaga(action) {
  try {
    const addCheckinAction = addCheckin({ ...action.payload });
    const response = yield call(database.saveCheckin, addCheckinAction);

    if (response.status !== 200) {
      throw new Error('SaveCheckin failed.');
    }

    yield put(reportSaveCheckinSuccess({ ...action.payload }));
    yield put(addCheckinAction);
    yield put(clearCurrentCheckin());
  } catch (error) {
    yield put(reportSaveCheckinError({ ...action.payload }));
  }
}

export function* saveCheckinSagaSimulateError(action) {
  yield put(reportSaveCheckinError({ ...action.payload }));
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
  yield takeEvery(saveCheckin().type, saveCheckinSaga);
}
export function* watchSaveCheckinSimulateError() {
  yield takeEvery(
    saveCheckinSimulateError().type,
    saveCheckinSagaSimulateError
  );
}
