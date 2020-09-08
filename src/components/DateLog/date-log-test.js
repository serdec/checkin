import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';

import styles from './date-log.module.css';
import DateLog from './date-log';

describe('date log', async (assert) => {
  const $ = render(<DateLog />);
  const contains = match($.html().trim());
  {
    assert({
      given: 'no argument',
      should: 'render the date log component',
      actual: contains(`${styles.dateLog}`),
      expected: styles.dateLog,
    });
  }
});
