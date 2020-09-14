import React from 'react';
import PropTypes from 'prop-types';
import { wrapper } from '../store/store';

import '../styles/vars.css';
import '../styles/global.css';
import '../styles/css/antd.css';

const initialState = {
  activeTeam: 'ckewf5fc200sz2c6cdxg6wmtc',
  teams: [
    {
      id: 'ckewf5fc200sz2c6cdxg6wmtc',
      creationDate: '09/09/2020',
      name: 'FrontEnd',
      owner: 'sdecri',
      members: ['sdecri'],
      checkIns: ['ckewf2knt00cu2c6cjfva0gge'],
    },
    {
      id: 'ckewf5fc200sz2c7afzy7znsd',
      creationDate: '09/09/2020',
      name: 'DevOps',
      owner: 'Jack',
      members: ['jack'],
      checkIns: ['ckewf2knt00cu2c6cjfva0gge'],
    },
  ],
  checkins: [
    {
      id: 'ckewf2knt00cu2c6cjfva0gge',
      date: '09/09/2020',
      user: 'sdecri',
      teamId: 'ckewf5fc200sz2c6cdxg6wmtc',
      teamName: 'FrontEnd',
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
      teamId: 'ckewf5fc200sz2c7afzy7znsd',
      teamName: 'DevOps',
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

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default wrapper.withRedux(MyApp);
