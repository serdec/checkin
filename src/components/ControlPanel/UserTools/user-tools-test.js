import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import styles from '../control-panel.module.css';
import UserControls from './user-tools';

describe('user controls', async (assert) => {
  const createUserControls = ({ teams } = {}) =>
    render(<UserControls teams={teams} />);
  {
    const $ = createUserControls();
    assert({
      given: 'no argument',
      should: 'render the user control component',
      expected: 1,
      actual: $(`.${styles.userControlsBox}`).length,
    });
  }
  {
    const $ = createUserControls();
    assert({
      given: 'no argument',
      should: 'render the view-checkins button',
      expected: 1,
      actual: $(`.${styles.userTools__viewCheckinsButton}`).length,
    });
  }
  {
    const teams = ['team1', 'team2'];
    const $ = createUserControls({ teams });
    assert({
      given: 'a list of teams',
      should: 'render the new-checkin button',
      expected: 1,
      actual: $(`.${styles.userTools__newCheckinButton}`).length,
    });
  }
});
