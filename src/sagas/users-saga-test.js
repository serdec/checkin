// import { describe } from 'riteway';
// import { saveUserData, getUserData } from './users-saga';
// import * as database from '../../services/database/database';
// import { call } from 'redux-saga/effects';
// import { addCheckin } from '../reducers/checkins/checkinsCollection/checkins-collection';

// describe('users-saga', async (assert) => {
//   {
//     const iterator = saveUserData(addCheckin());
//     assert({
//       given: 'some user data',
//       should: 'send the correct action to save those data',
//       actual: iterator.next().value,
//       expected: call(database.save, addCheckin()),
//     });
//   }
//   // {
//   //   const iterator = getUserData(addCheckin());
//   //   assert({
//   //     given: 'a user',
//   //     should: 'send the correct action to get his/her data',
//   //     actual: iterator.next().value,
//   //     expected: call(database.get, addCheckin().user),
//   //   });
//   //   assert({
//   //     given: 'a user',
//   //     should: 'send the correct action to get his/her data',
//   //     actual: iterator.next().value,
//   //     expected: {},
//   //   });
//   // }
// });
