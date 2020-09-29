import cuid from 'cuid';
import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import ListSummaryCard from './list-summary-card';

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
};

const newCheckin = ({
  id = '1',
  date = 0,
  user = '',
  teamId = '',
  teamName = teamId,
  previousTasks = _tasks.previousTasks,
  currentTasks = [],
  previousBlockers = [],
  currentBlockers = [],
  doingWellFeedback = '',
  needsImprovementFeedback = '',
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

const list = {
  title: 'Previous Tasks',
  content: 'previousTasks',
};

describe('list summary card', async (assert) => {
  const createListSummaryCard = ({ checkin = {}, list = {} } = {}) =>
    render(<ListSummaryCard checkin={checkin} list={list} />);

  {
    const checkin = newCheckin();
    const $ = createListSummaryCard({ checkin, list });
    const contains = match($.html().trim());
    assert({
      given: 'a checkin',
      should: 'render the summary card title',
      expected: list.title,
      actual: contains(list.title),
    });
  }
  {
    const checkin = newCheckin();
    const $ = createListSummaryCard({ checkin, list });
    const contains = match($.html().trim());
    assert({
      given: 'a checkin',
      should: 'render the summary card title',
      expected: checkin[list.content].map((item) => item.value),
      actual: checkin[list.content].map((item) => contains(item.value)),
    });
  }
  {
    const checkin = newCheckin();
    const $ = createListSummaryCard({ checkin, list });
    const contains = match($.html().trim());
    assert({
      given: 'a checkins',
      should: 'render the summary card content with correct active status',
      expected: checkin[list.content].map((item) =>
        item.active ? 'check' : 'close'
      ),
      actual: checkin[list.content].map((item) =>
        item.active ? contains('check') : contains('close')
      ),
    });
  }
});
