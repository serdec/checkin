import { describe } from 'riteway';
import {
  checkinsCollectionReducer,
  addCheckin,
  deleteCheckin,
  getCheckinByDay,
  getLatestCheckin,
} from './checkins-collection';

const newCheckin = ({
  id = '',
  date = 0,
  user = 'user1',
  team = 'my-team',
  yesterdayTasks = [],
  yesterdayBlockers = [],
  todayTasks = [],
  todayBlockers = [],
  doingWell = '',
  needsImprovements = '',
} = {}) => ({
  id,
  date,
  user,
  team,
  checkin: {
    yesterday: { yesterdayTasks, yesterdayBlockers },
    today: { todayTasks, todayBlockers },
    feedback: { doingWell, needsImprovements },
  },
});

describe('checkin list', async (assert) => {
  {
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      actual: checkinsCollectionReducer(),
      expected: [],
    });
  }

  {
    assert({
      given: 'a new checkin',
      should: 'add it to the current state',
      actual: checkinsCollectionReducer(undefined, addCheckin()),
      expected: [newCheckin()],
    });
  }

  {
    const checkInId = 'checkinId1';
    const actions = [
      addCheckin(newCheckin({ id: checkInId })),
      deleteCheckin(checkInId),
    ];
    const actualState = actions.reduce(
      checkinsCollectionReducer,
      checkinsCollectionReducer()
    );
    assert({
      given: 'a checkin id',
      should: 'delete the selected id from the checkin',
      actual: actualState,
      expected: [],
    });
  }

  {
    const checkinId = '1';
    const date = new Date();
    date.setFullYear(2020, 6, 31);
    const date2 = new Date();
    date2.setFullYear(2020, 0, 31);

    const actions = [
      newCheckin({ id: checkinId, date: date.getTime() }),
      newCheckin({ id: checkinId, date: date2.getTime() }),
    ].map(addCheckin);
    const actualState = actions.reduce(
      checkinsCollectionReducer,
      checkinsCollectionReducer()
    );
    assert({
      given: 'the current state and a date',
      should: 'return the checkins for the given date',
      actual: getCheckinByDay(actualState, date2.getTime()),
      expected: [newCheckin({ id: checkinId, date: date2.getTime() })],
    });
  }

  {
    const latestCheckin = newCheckin({ id: 'latest' });
    const actions = [newCheckin(), newCheckin(), latestCheckin].map(addCheckin);
    const actualState = actions.reduce(
      checkinsCollectionReducer,
      checkinsCollectionReducer()
    );

    assert({
      given: 'no arguments',
      should: 'return latest checkin',
      actual: getLatestCheckin(actualState),
      expected: latestCheckin,
    });
  }
});
