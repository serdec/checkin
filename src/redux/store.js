import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducers/checkin-reducer';
import rootSaga from '../features/users/users-sagas';
import createSagaMiddleware from 'redux-saga';
// export const createStore = (reducer) => {
//   let state = [];
//   let listeners = [];

//   const getState = () => state;

//   const dispatch = (action = {}) => {
//     state = reducer(state, action);
//     listeners.forEach((l) => l());
//   };

//   const subscribe = (listener) => {
//     listeners.push(listener);
//     return () => {
//       listeners.filter((l) => l !== listener);
//     };
//   };

//   return { getState, dispatch, subscribe };
// };

export const createStoreWithSaga = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStoreWithSaga();
