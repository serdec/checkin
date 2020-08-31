import React from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppHeader from './app-header';
import AppContent from './app-content';
import { checkinsCollectionReducer } from '../reducers/checkins/checkinsCollection/checkins-collection';
import { dailyCheckinReducer } from '../reducers/checkins/dailyCheckin/daily-checkin';
const rootReducer = combineReducers({
  checkins: checkinsCollectionReducer,
  current: dailyCheckinReducer,
});
const store = createStore(rootReducer);

const App = () => {
  console.log(store.getState());
  return (
    <Provider store={store}>
      <AppHeader />
      <AppContent />
    </Provider>
  );
};

export default App;
