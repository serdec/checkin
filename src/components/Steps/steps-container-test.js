import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import styles from './steps.module.css';
import StepsContainer from './steps-container';

describe('steps container', async (assert) => {
  const $ = render(<StepsContainer />);

  assert({
    given: 'no arguments',
    should: 'Render a form ',
    actual: $(`.${styles.stepsContainer}`).length,
    expected: 1,
  });
});
