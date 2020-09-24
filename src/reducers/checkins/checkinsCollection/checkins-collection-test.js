import { describe } from 'riteway';
import {
  checkinsCollectionReducer,
  addCheckin,
  deleteCheckin,
  getCheckinsByDay,
  getLatestCheckin,
  loadCheckins,
} from './checkins-collection';
import { getDateString } from '../../../lib/date/date';

const _tasks = {
  previous: ['previousTask1', 'previousTask2'],
  current: ['currentTask1', 'currentTask2'],
};
const _blockers = {
  previous: ['previousBlocker1', 'previousBlocker2'],
  current: ['currentBlocker1', 'currentBlocker2'],
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
  tasks = _tasks,
  blockers = _blockers,
  feedbacks = _feedbacks,
} = {}) => ({
  id,
  date,
  user,
  teamId,
  teamName,
  contributions: {
    tasks,
    blockers,
    feedbacks,
  },
});
const newAddCheckinInput = ({
  id = '',
  date = 0,
  user = '',
  teamId = '',
  teamName = teamId,
  tasks = _tasks,
  blockers = _blockers,
  feedbacks = _feedbacks,
} = {}) => ({
  id,
  date,
  user,
  teamId,
  teamName,
  tasks,
  blockers,
  feedbacks,
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
    const teamId = 'my-team';
    const id = '1';
    const date = 0;
    assert({
      given: 'a new checkin',
      should: 'add it to the current state',
      actual: checkinsCollectionReducer(
        undefined,
        addCheckin({
          id,
          date,
          teamId,
          tasks: _tasks,
          blockers: _blockers,
          feedbacks: _feedbacks,
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
    const teamId = 'my-team';
    const teamId2 = 'my-team2';
    const checkinId = '1';
    const date = getDateString(new Date());
    const date2 = getDateString(new Date('2020-12-25'));
    const actions = [
      newAddCheckinInput({ id: checkinId, date: date, teamId }),
      newAddCheckinInput({ id: checkinId, date: date2, teamId }),
      newAddCheckinInput({ id: checkinId, date: date, teamId: teamId2 }),
      newAddCheckinInput({ id: checkinId, date: date2, teamId: teamId2 }),
    ].map(addCheckin);
    const actualState = actions.reduce(
      checkinsCollectionReducer,
      checkinsCollectionReducer()
    );

    assert({
      given: 'the current state, a date and a teamId',
      should: 'return the checkins for the given date and the given teamId',
      actual: getCheckinsByDay({ state: actualState, date: date2, teamId }),
      expected: [
        {
          id: checkinId,
          user: newAddCheckinInput().user,
          previousTasks: newAddCheckinInput().tasks.previous,
          currentTasks: newAddCheckinInput().tasks.current,
          previousBlockers: newAddCheckinInput().blockers.previous,
          currentBlockers: newAddCheckinInput().blockers.current,
          doingWellFeedback: newAddCheckinInput().feedbacks.doingWell,
          needsImprovementFeedback: newAddCheckinInput().feedbacks
            .needsImprovement,
        },
      ],
    });
  }

  {
    const id = 'latest';
    const latestCheckin = newCheckin({ id: 'latest' });
    const actions = [
      newAddCheckinInput(),
      newAddCheckinInput(),
      newAddCheckinInput({ id }),
    ].map(addCheckin);
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

  {
    const actions = [newAddCheckinInput(), newAddCheckinInput()].map(
      addCheckin
    );
    const fetchedState = actions.reduce(
      checkinsCollectionReducer,
      checkinsCollectionReducer()
    );

    const previousStateActions = [
      newAddCheckinInput(),
      newAddCheckinInput(),
      newAddCheckinInput(),
    ].map(addCheckin);
    const previousState = previousStateActions.reduce(
      checkinsCollectionReducer,
      checkinsCollectionReducer()
    );

    assert({
      given: 'a state fetched remotely',
      should: 'update the current state with the data received',
      expected: checkinsCollectionReducer(
        previousState,
        loadCheckins({ payload: fetchedState })
      ),
      actual: fetchedState,
    });
  }
});
