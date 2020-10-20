import React from 'react';
import cuid from 'cuid';
import render from 'riteway/render-component';
import match from 'riteway/match';
import { describe } from 'riteway';
import styles from './steps.module.css';
import StepsContent from './steps-content';
import {
  DOING_WELL,
  feedbacksFields,
  NEEDS_IMPROVEMENT,
} from '../Checkins/NewCheckin/actions-selectors';

const tasks = {
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
const blockers = {
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
const feedbacks = {
  doingWell: 'Doing Well Content',
  needsImprovement: 'Needs Improvement Content',
};

const checkin = {
  previousTasks: tasks.previous,
  currentTasks: tasks.current,
  previousBlockers: blockers.previous,
  currentBlockers: blockers.current,
  doingWellFeedback: feedbacks.doingWell,
  needsImprovementFeedback: feedbacks.needsImprovement,
};
const previousCards = [
  {
    title: 'Previous Tasks',
    img: 'tasks.png',
    content: tasks.previous,
  },
  {
    title: 'Previous Blockers',
    img: 'blockers.png',
    content: blockers.previous,
  },
];

const currentCards = [
  {
    title: 'Tasks',
    img: 'tasks.png',
    content: tasks.current,
  },
  {
    title: 'Blockers',
    img: 'blockers.png',
    content: blockers.current,
  },
];

const feedbacksCards = [
  {
    title: 'Doing Well',
    img: 'doingWell.png',
    feedbackName: feedbacksFields[DOING_WELL],
    content: feedbacks.doingWell,
  },
  {
    title: 'Needs Improvement',
    img: 'improvements.png',
    feedbackName: feedbacksFields[NEEDS_IMPROVEMENT],
    content: feedbacks.needsImprovement,
  },
];
const doneCards = [
  {
    title: 'Done',
    img: 'done.png',
  },
];
describe('steps content', async (assert) => {
  const createStepsContent = ({ step = 0, checkin = {} } = {}) =>
    render(<StepsContent step={step} checkin={checkin} />);

  {
    const $ = createStepsContent();
    const contains = match($.html().trim());
    assert({
      given: 'no arguments',
      should: 'render steps content ',
      actual: contains(`${styles.stepsContent}`),
      expected: styles.stepsContent,
    });
  }

  {
    const step = 0;
    const $ = createStepsContent({ step, checkin });
    const contains = match($.html().trim());
    assert({
      given: 'the step 0',
      should: 'render the previous tasks and blockers card title',
      expected: previousCards.map((list) => list.title),
      actual: previousCards.map((list) => contains(list.title)),
    });
    assert({
      given: 'the step 0',
      should: 'render the previous tasks and blockers card image',
      expected: previousCards.map((list) => list.img),
      actual: previousCards.map((list) => contains(list.img)),
    });
    assert({
      given: 'the step 0',
      should: 'render the previous tasks and blockers card content',
      expected: previousCards.map((list) => list.content.map((el) => el.value)),
      actual: previousCards.map((list) =>
        list.content.map((el) => contains(el.value))
      ),
    });
  }
  {
    const step = 1;
    const $ = createStepsContent({ step, checkin });
    const contains = match($.html().trim());
    assert({
      given: 'the step 1',
      should: 'render the current tasks and blockers card title',
      expected: currentCards.map((list) => list.title),
      actual: currentCards.map((list) => contains(list.title)),
    });
    assert({
      given: 'the step 1',
      should: 'render current the tasks and blockers card image',
      expected: currentCards.map((list) => list.img),
      actual: currentCards.map((list) => contains(list.img)),
    });
    assert({
      given: 'the step 1',
      should: 'render the current tasks and blockers card content',
      expected: currentCards.map((list) => list.content.map((el) => el.value)),
      actual: currentCards.map((list) =>
        list.content.map((el) => contains(el.value))
      ),
    });
  }
  {
    const step = 2;
    const $ = createStepsContent({ step, checkin });
    const contains = match($.html().trim());
    assert({
      given: 'the step 2',
      should: 'render the feedbacks title',
      expected: feedbacksCards.map((feedback) => feedback.title),
      actual: feedbacksCards.map((feedback) => contains(feedback.title)),
    });
    assert({
      given: 'the step 2',
      should: 'render feedback images',
      expected: feedbacksCards.map((feedback) => feedback.img),
      actual: feedbacksCards.map((feedback) => contains(feedback.img)),
    });
    assert({
      given: 'the step 2',
      should: 'render feedback content',
      expected: feedbacksCards.map((feedback) => feedback.content),
      actual: feedbacksCards.map((feedback) => contains(feedback.content)),
    });
  }
  {
    const step = 3;
    const $ = createStepsContent({ step });
    const contains = match($.html().trim());
    assert({
      given: 'the step 3',
      should: 'render the done title',
      expected: doneCards.map((done) => done.title),
      actual: doneCards.map((done) => contains(done.title)),
    });
    assert({
      given: 'the step 3',
      should: 'render the done title',
      expected: doneCards.map((done) => done.img),
      actual: doneCards.map((done) => contains(done.img)),
    });
  }
});
