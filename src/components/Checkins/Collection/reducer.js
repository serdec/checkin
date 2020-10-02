import { combineReducers } from 'redux';
import {
  checkinsCollectionReducer,
  getCurrentBlockersFromLastCheckinFromCollection,
  getCurrentTasksFromLastCheckinFromCollection,
} from './checkins-collection-reducer';
import { reducer } from './save-checkin-states-reducer';

export const getCheckinsCollection = (state) => state.collection;
export const getSaveStatus = (state) => state.saveStatus;
export const getCurrentTasksFromLatestCheckin = (state) =>
  getCurrentTasksFromLastCheckinFromCollection(state.collection);
export const getCurrentBlockersFromLatestCheckin = (state) =>
  getCurrentBlockersFromLastCheckinFromCollection(state.collection);

export const checkinsReducer = combineReducers({
  collection: checkinsCollectionReducer,
  saveStatus: reducer,
});
