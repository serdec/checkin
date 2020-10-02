import React from 'react';
import cuid from 'cuid';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import CheckboxForm from './checkbox-form';
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
describe('checkbox form', async (assert) => {
  const $ = render(<CheckboxForm img={'testimage.png'} />);

  assert({
    given: 'no arguments',
    should: 'Render a CheckboxForm ',
    actual: $('.checkboxForm').length,
    expected: 1,
  });
});
