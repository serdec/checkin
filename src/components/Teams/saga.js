import { call, put, takeEvery } from 'redux-saga/effects';
import * as database from '../../services/database/database';
import { createTeam, loadTeams } from './reducer';
import { loginUser } from '../Checkins/Collection/saga';

export function* getTeams(action) {
  let { payload } = yield call(database.getTeams, action.payload);
  yield put(loadTeams({ payload }));
}
export function* saveTeam(action) {
  yield call(database.saveTeam, action);
}

/******** WATCHERS ***********/

export function* watchGetTeams() {
  yield takeEvery(loginUser().type, getTeams);
}

export function* watchSaveTeam() {
  yield takeEvery([createTeam().type], saveTeam);
}
