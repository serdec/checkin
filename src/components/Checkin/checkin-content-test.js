import { describe } from 'riteway';
import render from 'riteway/render-component';
import React from 'react';

import CheckinContent from './checkin-content';
import styles from './checkin-content.module.css';
describe('Checkin form', async (assert) => {
  const $ = render(<CheckinContent />);

  assert({
    given: 'no arguments',
    should: 'Render a form ',
    actual: $(`.${styles.stepsContainer}`).length,
    expected: 1,
  });
});
