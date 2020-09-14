// import { put, call, takeEvery, takeLatest, all } from 'redux-saga/effects';
// import * as database from '../../services/database/database';
// import { LOGIN_USER } from '../../redux/action-types';
// import { addCheckin } from '../../redux/reducers/rejection-reducer';

// export function* saveUserData(action) {
//   yield call(database.save, action);
//   yield put(action);
// }

// function* watchSaveUserData() {
//   yield takeEvery(addCheckin().type, saveUserData);
// }

// export function* getUserData(action) {
//   const data = yield call(database.get, action.payload);

//   let questions = [];
//   data.forEach((doc) => questions.push(doc.data()));
//   yield questions.map((doc) =>
//     put(
//       addCheckin({
//         user: doc.user,
//         status: doc.status,
//         askee: doc.askee,
//         ask: doc.ask,
//       })
//     )
//   );
//   yield put(addCheckin(questions));
// }

// function* watchGetUserData() {
//   yield takeLatest(LOGIN_USER, getUserData);
// }

// export default function* rootSaga() {
//   yield all([watchSaveUserData(), watchGetUserData()]);
// }
