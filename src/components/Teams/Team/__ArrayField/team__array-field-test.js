import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import { Team__ArrayField } from './team__array-field';
import styles from '../team.module.css';

describe('team__array-field', async (assert) => {
  const createTeam__ArrayField = ({ listName = '', members = [] } = {}) =>
    render(<Team__ArrayField listName={listName} members={members} />);

  {
    const $ = createTeam__ArrayField();
    assert({
      given: 'no arguments',
      should: 'render the team array field',
      expected: 1,
      actual: $(`.${styles.team__arrayField}`).length,
    });
  }
  {
    const members = ['item1', 'item2', 'item3'];
    const listName = 'ItemsLabel';
    const $ = createTeam__ArrayField({ listName, members });
    const contains = match($.html());
    assert({
      given: 'a listName',
      should: 'render the listName',
      expected: listName,
      actual: contains(listName),
    });
    assert({
      given: 'a list of members',
      should: 'render the members',
      expected: members,
      actual: members.map((member) => contains(member)),
    });
  }
});
