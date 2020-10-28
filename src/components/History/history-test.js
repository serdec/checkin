import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import { History } from './history';
import styles from './history.module.css';

describe('hitstory', async (assert) => {
  const createHistory = () => render(<History getCheckins={() => []} />);

  {
    const $ = createHistory();
    assert({
      given: 'no arguments',
      should: 'render the checkin history',
      expected: 1,
      actual: $(`.${styles.history}`).length,
    });
    assert({
      given: 'no arguments',
      should: 'render the calendar',
      expected: 1,
      actual: $(`.${styles.history__calendar}`).length,
    });
  }
});
