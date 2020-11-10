import { call, put, takeEvery } from 'redux-saga/effects';
import * as database from '../../services/database/database';
import {
  createTeam,
  deleteTeam,
  loadTeams,
  addUsers,
  removeUser,
} from './reducer';

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

/************* DELETE TEAM *****************/
export function* deleteTeamSaga(action) {
  try {
    yield call(database.deleteTeam, action.payload);
    yield call(database.deleteTeamFromUsers, action.payload);
  } catch (e) {
    console.log(`Error while deleting team ${e}`);
  }
}

export function* watchDeleteTeam() {
  yield takeEvery(deleteTeam().type, deleteTeamSaga);
}

/************* ADD MEMBER *****************/
export function* addUsersSaga(action) {
  try {
    yield call(database.addUsersToTeam, action.payload);
    yield call(database.addTeamToUsers, action.payload);
  } catch (e) {
    console.log(`Error while adding team members ${e}`);
  }
}
export function* watchAddMembers() {
  yield takeEvery(addUsers().type, addUsersSaga);
}
/************* REMOVE MEMBER *****************/
export function* removeUsersSaga(action) {
  try {
    yield call(database.removeUsersFromTeam, action.payload);
    if (action.payload.listName === 'members') {
      yield call(database.removeTeamFromUsers, action.payload);
    }
  } catch (e) {
    console.log(`Error while removing team members ${e}`);
  }
}
export function* watchRemoveUser() {
  yield takeEvery(removeUser().type, removeUsersSaga);
}
