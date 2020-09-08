import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { checkinsCollectionReducer } from '../reducers/checkins/checkinsCollection/checkins-collection';
import { dailyCheckinReducer } from '../reducers/checkins/dailyCheckin/daily-checkin';
import { teamsCollectionReducer } from '../reducers/teams/teamsCollection/teams-collection';

import '../styles/vars.css';
import '../styles/global.css';
import '../styles/css/antd.css';

const rootReducer = combineReducers({
  teams: teamsCollectionReducer,
  checkins: checkinsCollectionReducer,
  current: dailyCheckinReducer,
});

const store = createStore(rootReducer);

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
