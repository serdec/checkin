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

const _tasks = {
  previous: [
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
  ],
  current: [
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
  ],
};
const _blockers = {
  previous: [
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
  ],
  current: [
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
  ],
};
const _feedbacks = {
  doingWell: 'DoingWell',
  needsImprovement: 'NeedsImprovement',
};
const newCheckin = ({
  id = '',
  date = 0,
  user = '',
  teamId = '',
  teamName = teamId,
  previousTasks = _tasks.previous,
  currentTasks = _tasks.current,
  previousBlockers = _blockers.previous,
  currentBlockers = _blockers.current,
  doingWellFeedback = _feedbacks.doingWell,
  needsImprovementFeedback = _feedbacks.needsImprovement,
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
    const teamId = 'my-team';
    const id = '1';
    const date = 0;
    assert({
      given: 'a new checkin',
      should: 'add it to the current state',
      actual: checkinsReducer(
        undefined,
        addCheckin({
          id,
          date,
          teamId,
          previousTasks: _tasks.previous,
          currentTasks: _tasks.current,
          previousBlockers: _blockers.previous,
          currentBlockers: _blockers.current,
          doingWellFeedback: _feedbacks.doingWell,
          needsImprovementFeedback: _feedbacks.needsImprovement,
        })
      ),
      expected: [newCheckin({ id, date, teamId })],
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
    const checkinId = '1';
    const date = getDateString(new Date());
    const date2 = getDateString(new Date('2020-12-25'));
    const actions = [
      newCheckin({ id: checkinId, date: date, teamId }),
      newCheckin({ id: checkinId, date: date2, teamId }),
      newCheckin({ id: checkinId, date: date, teamId: teamId2 }),
      newCheckin({ id: checkinId, date: date2, teamId: teamId2 }),
    ].map(addCheckin);
    const actualState = actions.reduce(checkinsReducer, checkinsReducer());

    assert({
      given: 'the current state, a date and a teamId',
      should: 'return the checkins for the given date and the given teamId',
      expected: [
        {
          id: checkinId,
          user: newCheckin().user,
          previousTasks: newCheckin().previousTasks,
          currentTasks: newCheckin().currentTasks,
          previousBlockers: newCheckin().previousBlockers,
          currentBlockers: newCheckin().currentBlockers,
          doingWellFeedback: newCheckin().doingWellFeedback,
          needsImprovementFeedback: newCheckin().needsImprovementFeedback,
        },
      ],
      actual: getCheckinsByDay({ state: actualState, date: date2, teamId }),
    });
  }

  {
    const id = 'latest';
    const latestCheckin = newCheckin({ id: 'latest' });
    const actions = [newCheckin(), newCheckin(), newCheckin({ id })].map(
      addCheckin
    );
    const actualState = actions.reduce(checkinsReducer, checkinsReducer());

    assert({
      given: 'no arguments',
      should: 'return latest checkin',
      actual: getLatestCheckin(actualState),
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
