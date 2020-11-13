import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import { Team } from './team';
import styles from './team.module.css';
describe('team', async (assert) => {
  const createTeam = ({
    user = { email: '' },
    team = { name: '', owners: [] },
  } = {}) => render(<Team user={user} team={team} />);
  {
    const $ = createTeam();
    assert({
      given: 'no arguments',
      should: 'render the team',
      expected: 1,
      actual: $(`.${styles.team}`).length,
    });
  }
  {
    const $ = createTeam();
    assert({
      given: 'no arguments',
      should: 'render the delete team button',
      expected: 1,
      actual: $(`.${styles.team__delete}`).length,
    });
  }
  {
    const name = 'TeamName';
    const team = { name, owners: [] };
    const $ = createTeam({ team });
    const contains = match($.html());
    assert({
      given: 'a team name',
      should: 'render the name',
      expected: name,
      actual: contains(name),
    });
  }
});
