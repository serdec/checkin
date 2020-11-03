import { call, put, takeEvery } from 'redux-saga/effects';
import * as database from '../../services/database/database';
import { createTeam, loadTeams, addMembers } from './reducer';

/************* GET TEAM *****************/
export const loginUser = ({ user = '' } = {}) => ({
  type: loginUser.type,
  payload: user,
});
loginUser.type = 'USER::LOGIN';

export function* getTeams(action) {
  try {
    let { payload } = yield call(database.getTeams, action.payload);
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
    yield call(database.addTeamToUsers, {
      teamId: action.payload.id,
      users: action.payload.owners,
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
    yield call(database.addUsersToTeam, action.payload);
    yield call(database.addTeamToUsers, action.payload);
  } catch (e) {
    console.log(`Error while adding team members ${e}`);
  }
}
export function* watchAddMembers() {
  yield takeEvery(addMembers().type, addMembersSaga);
}
