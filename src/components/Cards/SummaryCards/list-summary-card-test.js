import cuid from 'cuid';
import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import ListSummaryCard from './list-summary-card';

const tasks = [
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

const list = {
  title: 'Previous Tasks',
  content: tasks,
};

describe('list summary card', async (assert) => {
  const createListSummaryCard = ({ title = '', list = [] } = {}) =>
    render(<ListSummaryCard list={list} title={title} />);

  {
    const $ = createListSummaryCard({ title: list.title, list: list.content });
    const contains = match($.html().trim());
    assert({
      given: 'a checkin',
      should: 'render the summary card title',
      expected: list.title,
      actual: contains(list.title),
    });
  }
  {
    const $ = createListSummaryCard({ title: list.title, list: list.content });
    const contains = match($.html().trim());
    assert({
      given: 'a checkin',
      should: 'render the summary card title',
      expected: list.content.map((item) => item.value),
      actual: list.content.map((item) => contains(item.value)),
    });
  }
  {
    const $ = createListSummaryCard({ title: list.title, list: list.content });
    const contains = match($.html().trim());
    assert({
      given: 'a checkins',
      should: 'render the summary card content with correct checked status',
      expected: list.content.map((item) => (item.checked ? 'check' : 'close')),
      actual: list.content.map((item) =>
        item.checked ? contains('check') : contains('close')
      ),
    });
  }
});
