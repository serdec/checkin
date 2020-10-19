// eslint-disable-next-line
import { all } from 'redux-saga/effects';
import {
  watchGetCheckins,
  watchSaveCheckin,
  watchSaveCheckinSimulateError,
} from '../components/Checkins/Collection/saga';
import { watchLoadPreviousTasksAndBlockers } from '../components/Checkins/NewCheckin/saga';
import { watchGetTeams, watchSaveTeam } from '../components/Teams/saga';

export default function* rootSaga() {
  yield all([
    watchSaveCheckin(),
    watchSaveCheckinSimulateError(),
    watchGetCheckins(),
    watchGetTeams(),
    watchSaveTeam(),
    watchLoadPreviousTasksAndBlockers(),
  ]);
}
