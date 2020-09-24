import { call, put, takeEvery } from 'redux-saga/effects';
import * as database from '../services/database/database';
import {
  addCheckin,
  loadCheckins,
} from '../reducers/checkins/checkinsCollection/checkins-collection';
import { createTeam, loadTeams } from '../components/Teams/team-reducer';
import { loginUser } from '../store/root-reducer';
import dsm from 'redux-dsm';

// prettier-ignore
const saveCheckinsStates =
  ['initial', 'idle',
    ['save checkin', 'savingCheckin',
      ['report save checkin error', 'error',
        ['handle error', 'idle']
      ],
      ['report save checkin success', 'success',
        ['handle success', 'idle']
      ]
    ]
  ];

export const {
  actionCreators: { reportSaveCheckinError, reportSaveCheckinSuccess },
} = dsm({
  component: 'Checkin',
  description: 'save checkin',
  actionStates: saveCheckinsStates,
});

export function* saveCheckin(action) {
  try {
    const response = yield call(database.saveCheckin, action);
    if (response.status !== 200) {
      throw new Error('SaveCheckin failed.');
    }
    yield put(reportSaveCheckinSuccess());
  } catch (error) {
    yield put(reportSaveCheckinError(error));
  }
}

export function* getCheckins(action) {
  let data = yield call(database.getCheckins, action.payload);
  yield put(loadCheckins({ payload: data }));
}

export function* getTeams(action) {
  let data = yield call(database.getTeams, action.payload);
  yield put(loadTeams({ payload: data }));
}
export function* saveTeam(action) {
  yield call(database.saveTeam, action);
}

/******** WATCHERS ***********/

export function* watchGetCheckins() {
  yield takeEvery(loginUser().type, getTeams);
  yield takeEvery(loginUser().type, getCheckins);
}

export function* watchSaveCheckin() {
  yield takeEvery([addCheckin().type], saveCheckin);
}

export function* watchSaveTeam() {
  yield takeEvery([createTeam().type], saveTeam);
}
