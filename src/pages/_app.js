import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { checkinsCollectionReducer } from '../reducers/checkins/checkinsCollection/checkins-collection';
import { dailyCheckinReducer } from '../reducers/checkins/dailyCheckin/daily-checkin';
import { teamReducer } from '../components/Teams/team-reducer';

import '../styles/vars.css';
import '../styles/global.css';
import '../styles/css/antd.css';

const initialState = {
  teams: [
    {
      id: 'ckewf5fc200sz2c6cdxg6wmtc',
      creationDate: '09/09/2020',
      name: 'MyTeam',
      owner: 'sdecri',
      members: ['sdecri'],
      checkIns: ['ckewf2knt00cu2c6cjfva0gge'],
    },
  ],
  checkins: [
    {
      id: 'ckewf2knt00cu2c6cjfva0gge',
      date: '09/09/2020',
      user: 'sdecri',
      team: 'MyTeam',
      checkin: {
        yesterday: {
          yesterdayTasks: [
            {
              id: 'ckewf1c84000q2c6cqjmx3vt5',
              active: true,
              value: 'yesterday task',
            },
          ],
          yesterdayBlockers: [
            { id: 'ckewf1fat000x2c6chbds1bj7', active: true, value: 'blocker' },
          ],
        },
        today: {
          todayTasks: [
            {
              id: 'ckewf1szs00142c6cjfkc3efx',
              active: true,
              value: 'create teams',
            },
          ],
          todayBlockers: [
            {
              id: 'ckewf1ylj001b2c6cr7etvm6b',
              active: true,
              value: 'firebase initialization',
            },
          ],
        },
        feedback: {
          doingWellFeedback: 'remote culture',
          needsImprovementFeedback: 'communication: drop the chat',
        },
      },
    },
    {
      id: 'ckewf4am500ss2c6cwkjogtic',
      date: '09/10/2020',
      user: 'user1',
      team: 'my-team',
      checkin: {
        yesterday: {
          yesterdayTasks: [
            {
              id: 'ckewf2v0j00dd2c6c5h8qqo0r',
              active: true,
              value: 'another task',
            },
          ],
          yesterdayBlockers: [
            {
              id: 'ckewf2ygd00dk2c6ci42a4ra0',
              active: true,
              value: 'another blocker',
            },
          ],
        },
        today: {
          todayTasks: [
            {
              id: 'ckewf3aep00e32c6cz1plbl4t',
              active: true,
              value: 'read tdd article',
            },
          ],
          todayBlockers: [],
        },
        feedback: {
          doingWellFeedback: 'suggested books',
          needsImprovementFeedback: 'we need to start mentorship programs',
        },
      },
    },
  ],
  current: {
    yesterdayTasks: [
      { id: 'ckewf2v0j00dd2c6c5h8qqo0r', active: true, value: 'another task' },
    ],
    yesterdayBlockers: [
      {
        id: 'ckewf2ygd00dk2c6ci42a4ra0',
        active: true,
        value: 'another blocker',
      },
    ],
    todayTasks: [
      {
        id: 'ckewf3aep00e32c6cz1plbl4t',
        active: true,
        value: 'read tdd article',
      },
    ],
    todayBlockers: [],
    doingWellFeedback: 'suggested books',
    needsImprovementFeedback: 'we need to start mentorship programs',
  },
};
const rootReducer = combineReducers({
  teams: teamReducer,
  checkins: checkinsCollectionReducer,
  current: dailyCheckinReducer,
});

const store = createStore(rootReducer, initialState);

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};
