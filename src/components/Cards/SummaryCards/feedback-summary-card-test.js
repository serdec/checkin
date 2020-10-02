import cuid from 'cuid';
import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import FeedbackSummaryCard from './feedback-summary-card';

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

const feedback = {
  title: 'Doing Well',
  content: 'doingWellFeedback',
};

describe('feedback summary card', async (assert) => {
  const createFeedbackSummaryCard = ({ checkin = {}, feedback = {} } = {}) =>
    render(<FeedbackSummaryCard feedback={feedback} checkin={checkin} />);
  {
    const checkin = newCheckin();
    const $ = createFeedbackSummaryCard({ checkin, feedback });
    const contains = match($.html().trim());
    assert({
      given: 'a checkin',
      should: 'render the feedback summary card title',
      actual: contains(feedback.title),
      expected: feedback.title,
    });
  }
  {
    const checkin = newCheckin();
    const $ = createFeedbackSummaryCard({ checkin, feedback });
    const contains = match($.html().trim());
    assert({
      given: 'a checkin',
      should: 'render the feedback summary card content',
      expected: checkin[feedback.content],
      actual: contains(checkin[feedback.content]),
    });
  }
});
