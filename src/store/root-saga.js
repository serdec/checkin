// eslint-disable-next-line
import { all } from 'redux-saga/effects';
import {
  watchGetCheckins,
  watchSaveCheckin,
} from '../components/Checkins/Collection/saga';
import { watchLoadPreviousTasksAndBlockers } from '../components/Checkins/NewCheckin/saga';
import {
  watchAddMembers,
  watchGetTeams,
  watchRemoveUser,
  watchDeleteTeam,
  watchSaveTeam,
} from '../components/Teams/saga';

export default function* rootSaga() {
  yield all([
    watchAddMembers(),
    watchRemoveUser(),
    watchSaveCheckin(),
    watchGetCheckins(),
    watchGetTeams(),
    watchDeleteTeam(),
    watchSaveTeam(),
    watchLoadPreviousTasksAndBlockers(),
  ]);
}
