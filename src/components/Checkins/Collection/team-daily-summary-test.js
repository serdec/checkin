import cuid from 'cuid';
import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import TeamDayCheckins from './team-daily-summary';
import styles from '../checkins.module.css';

const _tasks = {
  previousTasks: [
    {
      active: true,
      id: cuid(),
      value: 'previousTask1',
    },
    {
      active: false,
      id: cuid(),
      value: 'previousTask2',
    },
  ],
  currentTasks: [
    {
      active: true,
      id: cuid(),
      value: 'currentTask1',
    },
    {
      active: false,
      id: cuid(),
      value: 'currentTask2',
    },
  ],
};
const _blockers = {
  previousBlockers: [
    {
      active: true,
      id: cuid(),
      value: 'previousBlocker1',
    },
    {
      active: false,
      id: cuid(),
      value: 'previousBlocker2',
    },
  ],
  currentBlockers: [
    {
      active: true,
      id: cuid(),
      value: 'currentBlocker1',
    },
    {
      active: false,
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
  id = '1',
  date = 0,
  user = '',
  teamId = '',
  teamName = teamId,
  previousTasks = _tasks.previousTasks,
  currentTasks = _tasks.currentTasks,
  previousBlockers = _blockers.previousBlockers,
  currentBlockers = _blockers.currentBlockers,
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

const listsCards = [
  {
    title: 'Previous Tasks',
    content: 'previousTasks',
  },
  {
    title: 'Current Tasks',
    content: 'currentTasks',
  },
  {
    title: 'Previous Blockers',
    content: 'previousBlockers',
  },
  {
    title: 'Current Blockers',
    content: 'currentBlockers',
  },
];
const feedbacksCards = [
  {
    title: 'Doing Well',
    content: 'doingWellFeedback',
  },
  {
    title: 'Needs Improvement',
    content: 'needsImprovementFeedback',
  },
];

describe('team daily summary', async (assert) => {
  const newTeamDayCheckin = (checkins = []) =>
    render(<TeamDayCheckins checkins={checkins} />);

  {
    const $ = newTeamDayCheckin();
    const contains = match($.html().trim());
    assert({
      given: 'a list of checkins',
      should: 'render them',
      actual: contains(styles.teamDayCheckins),
      expected: styles.teamDayCheckins,
    });
  }
  {
    const checkins = [newCheckin()];
    const $ = newTeamDayCheckin(checkins);
    const contains = match($.html().trim());
    assert({
      given: 'a list of checkins',
      should: 'render the tasks and blockers cards titles',
      expected: listsCards.map((obj) => obj.title),
      actual: listsCards.map((obj) => contains(obj.title)),
    });
  }
  {
    const checkins = [newCheckin()];
    const $ = newTeamDayCheckin(checkins);
    const contains = match($.html().trim());
    assert({
      given: 'a list of checkins',
      should: 'render the tasks and blockers cards contents',
      expected: checkins.map((checkin) =>
        listsCards.map((obj) => checkin[obj.content].map((item) => item.value))
      ),
      actual: checkins.map((checkin) =>
        listsCards.map((obj) =>
          checkin[obj.content].map((item) => contains(item.value))
        )
      ),
    });
  }
  {
    const checkins = [newCheckin()];
    const $ = newTeamDayCheckin(checkins);
    const contains = match($.html().trim());
    assert({
      given: 'a list of checkins',
      should:
        'render the tasks and blockers cards contents with correct active status',
      expected: checkins.map((checkin) =>
        listsCards.map((obj) =>
          checkin[obj.content].map((item) => (item.active ? 'check' : 'close'))
        )
      ),
      actual: checkins.map((checkin) =>
        listsCards.map((obj) =>
          checkin[obj.content].map((item) =>
            item.active ? contains('check') : contains('close')
          )
        )
      ),
    });
  }
  {
    const checkins = [newCheckin()];
    const $ = newTeamDayCheckin(checkins);
    const contains = match($.html().trim());
    assert({
      given: 'a list of checkins',
      should: 'render the feedbacks cards',
      actual: feedbacksCards.map((obj) => contains(obj.title)),
      expected: feedbacksCards.map((obj) => obj.title),
    });
  }
  {
    const checkins = [newCheckin()];
    const $ = newTeamDayCheckin(checkins);
    const contains = match($.html().trim());
    assert({
      given: 'a list of checkins',
      should: 'render the feedbacks cards',
      expected: checkins.map((checkin) =>
        feedbacksCards.map((obj) => checkin[obj.content])
      ),
      actual: checkins.map((checkin) =>
        feedbacksCards.map((obj) => contains(checkin[obj.content]))
      ),
    });
  }
});
