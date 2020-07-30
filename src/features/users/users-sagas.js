import { put, call, takeEvery, takeLatest, all } from 'redux-saga/effects';
import * as database from '../../services/database/database';
import { ADD_QUESTION_DB_REDUCER, LOGIN_USER } from '../../redux/action-types';
import { addQuestion } from '../../redux/reducers/checkin-reducer';

export function* saveUserData(action) {
  yield call(database.save, action);
  yield put(addQuestion(action));
}

function* watchSaveUserData() {
  yield takeEvery(ADD_QUESTION_DB_REDUCER, saveUserData);
}

export function* getUserData(action) {
  const data = yield call(database.get, action.payload);

  let questions = [];
  data.forEach((doc) => questions.push(doc.data()));
  yield questions.map((doc) =>
    put(
      addQuestion({
        user: doc.user,
        status: doc.status,
        askee: doc.askee,
        ask: doc.ask,
      })
    )
  );
  yield put(addQuestion(questions));
}

function* watchGetUserData() {
  yield takeLatest(LOGIN_USER, getUserData);
}

export default function* rootSaga() {
  yield all([watchSaveUserData(), watchGetUserData()]);
}
