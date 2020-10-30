import { call, put, takeEvery } from 'redux-saga/effects';
import * as database from '../../services/database/database';
import { createTeam, loadTeams, addMembers } from './reducer';
import { loginUser } from '../Checkins/Collection/saga';

/************* GET TEAM *****************/

export function* getTeams(action) {
  try {
    let { payload } = yield call(database.getTeams, { user: action.payload });
    yield put(loadTeams({ payload }));
  } catch (e) {
    console.log(`Error while retrieving the teams ${e}`);
  }
}

export function* watchGetTeams() {
  yield takeEvery(loginUser().type, getTeams);
}

/************* SAVE TEAM *****************/
export function* saveTeam(action) {
  try {
    yield call(database.saveTeam, action.payload);
    yield call(database.updateUserWithTeam, {
      teamId: action.payload.id,
      user: action.payload.owner,
    });
  } catch (e) {
    console.log(`Error while saving team ${e}`);
  }
}

export function* watchSaveTeam() {
  yield takeEvery([createTeam().type], saveTeam);
}

/************* ADD MEMBER *****************/
export function* addMembersSaga(action) {
  try {
    yield call(database.addMembers, action.payload);
    yield call(database.updateUsersWithTeam, action.payload);
  } catch (e) {
    console.log(`Error while adding team members ${e}`);
  }
}
export function* watchAddMembers() {
  yield takeEvery(addMembers().type, addMembersSaga);
}
