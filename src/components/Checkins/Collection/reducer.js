import { combineReducers } from 'redux';
import { checkinsCollectionReducer } from './checkins-collection-reducer';
import * as saveCheckinStatesReducer from './save-checkin-states-reducer';

export const getCheckinsCollection = (state) => state.collection;
export const getSaveStatus = (state) => state.saveStatus;

export const checkinsReducer = combineReducers({
  collection: checkinsCollectionReducer,
  saveStatus: saveCheckinStatesReducer.reducer,
});
