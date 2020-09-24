// eslint-disable-next-line
import { all } from 'redux-saga/effects';
import {
  watchGetCheckins,
  watchSaveCheckin,
  watchSaveTeam,
} from '../sagas/users-saga';

export default function* rootSaga() {
  yield all([watchSaveCheckin(), watchGetCheckins(), watchSaveTeam()]);
}
