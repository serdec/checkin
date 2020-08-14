import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppHeader from './app-header';
import AppContent from './app-content';
import { dailyCheckinReducer } from '../reducers/checkins/dailyCheckin/daily-checkin';

const store = createStore(dailyCheckinReducer);

const App = () => {
  return (
    <Provider store={store}>
      <AppHeader />
      <AppContent />
    </Provider>
  );
};

export default App;
