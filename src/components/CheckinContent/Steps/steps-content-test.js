import React from 'react';
import render from 'riteway/render-component';
import match from 'riteway/match';
import { describe } from 'riteway';
import styles from '../checkin-content.module.css';
import StepsContent from './steps-content';

describe('steps content', async (assert) => {
  const createStepsContent = ({ current = 0 } = {}) =>
    render(<StepsContent current={current} />);

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
    const current = 2;
    const $ = createStepsContent({ current });
    const contains = match($.html().trim());
    assert({
      given: 'the current step',
      should: 'render the correct content',
      actual: contains('Doing Well'),
      expected: 'Doing Well',
    });
  }

  {
    const current = 1;
    const $ = createStepsContent({ current });
    const contains = match($.html().trim());
    assert({
      given: 'the current step',
      should: 'render the correct content',
      actual: contains('Tasks'),
      expected: 'Tasks',
    });
  }
});
