import { call, put, takeEvery } from 'redux-saga/effects';
import * as database from '../../../services/database/database';
import { clearNewCheckin } from '../NewCheckin/list-reducer';
import { addCheckin, loadCheckins } from './reducer';
import {
  saveCheckin,
  saveCheckinSimulateError,
  reportSaveCheckinError,
  reportSaveCheckinSuccess,
} from './save-checkin-states-reducer';

const LOGIN = 'LOGIN';

export const loginUser = ({ user = '' } = {}) => ({
  type: LOGIN,
  payload: user,
});
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
