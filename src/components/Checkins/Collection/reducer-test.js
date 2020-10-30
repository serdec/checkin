import { describe } from 'riteway';
import {
  checkinsReducer,
  addCheckin,
  deleteCheckin,
  getCheckinsByDay,
  getLatestCheckin,
  loadCheckins,
} from './reducer';
import { getDateString } from '../../../lib/date/date';
import cuid from 'cuid';

const createPreviousDefaultTasks = () => [
  {
    checked: true,
    id: cuid(),
    value: 'previousTask1',
  },
  {
    checked: false,
    id: cuid(),
    value: 'previousTask2',
  },
];
const createCurrentDefaultTasks = () => [
  {
    checked: true,
    id: cuid(),
    value: 'currentTask1',
  },
  {
    checked: false,
    id: cuid(),
    value: 'currentTask2',
  },
];

const createPreviousDefautlBlockers = () => [
  {
    checked: true,
    id: cuid(),
    value: 'previousBlocker1',
  },
  {
    checked: false,
    id: cuid(),
    value: 'previousBlocker2',
  },
];

const createCurrentDefaultBlockers = () => [
  {
    checked: true,
    id: cuid(),
    value: 'currentBlocker1',
  },
  {
    checked: false,
    id: cuid(),
    value: 'currentBlocker2',
  },
];

const createDefaultDoingWellFeedback = () => 'Doing Well';
const createDefaultNeedsImprovementFeedback = () => 'Needs Improvement';
const newCheckin = ({
  id = '',
  date = 0,
  user = '',
  teamId = '',
  teamName = teamId,
  previousTasks = createPreviousDefaultTasks(),
  currentTasks = createCurrentDefaultTasks(),
  previousBlockers = createPreviousDefautlBlockers(),
  currentBlockers = createCurrentDefaultBlockers(),
  doingWellFeedback = createDefaultDoingWellFeedback(),
  needsImprovementFeedback = createDefaultNeedsImprovementFeedback(),
} = {}) => ({
  id,
  date,
  user,
  teamId,
  teamName,
  previousTasks,
  currentTasks,
  previousBlockers,
  currentBlockers,
  doingWellFeedback,
  needsImprovementFeedback,
});

describe('checkins collection', async (assert) => {
  {
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      actual: checkinsReducer(),
      expected: [],
    });
  }

  {
    const checkin = newCheckin({
      id: '1',
      date: 0,
      teamId: 'my-team',
    });
    assert({
      given: 'a new checkin',
      should: 'add it to the current state',
      actual: checkinsReducer(undefined, addCheckin(checkin)),
      expected: [newCheckin(checkin)],
    });
  }

  {
    const checkInId = 'checkinId1';
    const actions = [
      addCheckin(newCheckin({ id: checkInId })),
      deleteCheckin(checkInId),
    ];
    const actualState = actions.reduce(checkinsReducer, checkinsReducer());
    assert({
      given: 'a checkin id',
      should: 'delete the selected id from the checkin',
      actual: actualState,
      expected: [],
    });
  }

  {
    const teamId = 'my-team';
    const teamId2 = 'my-team2';
    const date = getDateString(new Date());
    const date2 = getDateString(new Date('2020-12-25'));
    const checkin = newCheckin({ id: '1', date: date2, teamId });
    const actions = [
      newCheckin(checkin),
      newCheckin({ id: '2', date, teamId }),
      newCheckin({ id: '3', date: date, teamId: teamId2 }),
      newCheckin({ id: '4', date: date2, teamId: teamId2 }),
    ].map(addCheckin);
    const actualState = actions.reduce(checkinsReducer, checkinsReducer());

    assert({
      given: 'the current state, a date and a teamId',
      should: 'return the checkins for the given date and the given teamId',
      expected: [checkin],
      actual: getCheckinsByDay({ checkins: actualState, date: date2, teamId }),
    });
  }

  {
    const teamId = cuid();
    const firstCheckin = newCheckin({ id: 'first', teamId });
    const latestCheckin = newCheckin({ id: 'latest', teamId });
    const actions = [firstCheckin, newCheckin(), latestCheckin].map(addCheckin);
    const actualState = actions.reduce(checkinsReducer, checkinsReducer());

    assert({
      given: 'no arguments',
      should: 'return latest checkin',
      actual: getLatestCheckin(actualState, latestCheckin.teamId),
      expected: latestCheckin,
    });

    {
      assert({
        given: 'an empty state',
        should: 'return an empty object',
        expected: {},
        actual: getLatestCheckin([]),
      });
    }
  }

  {
    const actions = [newCheckin(), newCheckin()].map(addCheckin);
    const fetchedState = actions.reduce(checkinsReducer, checkinsReducer());

    const previousStateActions = [newCheckin(), newCheckin(), newCheckin()].map(
      addCheckin
    );
    const previousState = previousStateActions.reduce(
      checkinsReducer,
      checkinsReducer()
    );

    assert({
      given: 'a state fetched remotely',
      should: 'update the current state with the data received',
      expected: checkinsReducer(
        previousState,
        loadCheckins({ payload: fetchedState })
      ),
      actual: fetchedState,
    });
  }
});
