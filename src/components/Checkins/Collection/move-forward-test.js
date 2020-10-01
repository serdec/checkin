import cuid from 'cuid';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import {
  getNotCheckedItems,
  getPreviousTasks,
} from '../CurrentCheckin/reducer';
import {
  getLatestCheckin,
  getPreviousTasksFromCollection,
} from './checkins-collection-reducer';

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

describe('move forward', async (assert) => {
  {
    const lastCheckin = newCheckin();
    const checkins = [newCheckin(), newCheckin(), lastCheckin];
    assert({
      given: 'a list of checkins',
      should: 'return the last checkin added',
      expected: lastCheckin,
      actual: getLatestCheckin(checkins),
    });
  }
  {
    const checkins = [];

    assert({
      given: 'an empty list of previous checkins',
      should: 'return an empty list',
      expected: [],
      actual: getPreviousTasksFromCollection(checkins),
    });
  }
  {
    const lastCheckin = newCheckin();
    const checkins = {
      checkins: { collection: [newCheckin(), newCheckin(), lastCheckin] },
    };

    assert({
      given: 'a list of previous checkins',
      should: 'get the latest tasks',
      expected: [...lastCheckin.contributions.tasks.current],
      actual: getPreviousTasksFromCollection(checkins),
    });
  }
  {
    const lastCheckin = newCheckin();
    const checkins = {
      checkins: { collection: [newCheckin(), newCheckin(), lastCheckin] },
    };
    const activeTasks = [..._tasks.current.filter((task) => !task.checked)];
    assert({
      given: 'a list of previous checkins',
      should: 'return the still checked tasks',
      expected: activeTasks,
      actual: getNotCheckedItems(getPreviousTasksFromCollection(checkins)),
    });
  }
});
