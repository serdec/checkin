import { describe } from 'riteway';
import {
  checkinsCollectionReducer,
  addCheckin,
  deleteCheckin,
  getCheckinByDay,
  getLatestCheckin,
} from './checkins-collection';
import { getDateString } from '../../../lib/date/date';

const newCheckin = ({
  id = '',
  date = 0,
  user = 'user1',
  team = 'my-team',
  yesterdayTasks = [],
  yesterdayBlockers = [],
  todayTasks = [],
  todayBlockers = [],
  doingWellFeedback = '',
  needsImprovementFeedback = '',
} = {}) => ({
  id,
  date,
  user,
  team,
  checkin: {
    yesterday: { yesterdayTasks, yesterdayBlockers },
    today: { todayTasks, todayBlockers },
    feedback: { doingWellFeedback, needsImprovementFeedback },
  },
});

describe('checkins collection', async (assert) => {
  {
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      actual: checkinsCollectionReducer(),
      expected: [],
    });
  }

  {
    const id = '1';
    const date = 0;
    assert({
      given: 'a new checkin',
      should: 'add it to the current state',
      actual: checkinsCollectionReducer(undefined, addCheckin({ id, date })),
      expected: [newCheckin({ id, date })],
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
    const date = getDateString(new Date());
    const date2 = getDateString(new Date('2020-12-25'));
    const actions = [
      newCheckin({ id: checkinId, date: date }),
      newCheckin({ id: checkinId, date: date2 }),
    ].map(addCheckin);
    const actualState = actions.reduce(
      checkinsCollectionReducer,
      checkinsCollectionReducer()
    );
    assert({
      given: 'the current state and a date',
      should: 'return the checkins for the given date',
      actual: getCheckinByDay(actualState, date2),
      expected: [newCheckin({ id: checkinId, date: date2 })],
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
