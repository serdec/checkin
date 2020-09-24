import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import TeamDayCheckins from './team-day-checkins';
import styles from './date-log.module.css';

describe('team day checkins', async (assert) => {
  const newTeamDayCheckin = () => render(<TeamDayCheckins />);

  {
    const $ = newTeamDayCheckin();
    const contains = match($.html().trim());
    assert({
      given: 'a list of checkins',
      should: 'render them',
      actual: contains(styles.teamDayCheckins),
      expected: styles.teamDayCheckins,
    });
  }
});
