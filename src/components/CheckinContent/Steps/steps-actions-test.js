import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import StepsActions from './steps-actions';
import styles from '../checkin-content.module.css';

describe('steps actions', async (assert) => {
  const createStepsActions = ({ current = 0 } = {}) =>
    render(<StepsActions current={current} />);

  {
    const $ = createStepsActions();
    const contains = match($.html().trim());
    assert({
      given: 'no arguments',
      should: 'render steps content ',
      actual: contains(`${styles.stepsActions}`),
      expected: styles.stepsActions,
    });
  }
});
