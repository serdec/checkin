import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import Team__SimpleField from './team__simple-field';
import styles from '../team.module.css';

describe('team__simple-field', async (assert) => {
  const createTeam__SimpleField = ({ label = '', value = '' } = {}) =>
    render(<Team__SimpleField label={label} value={value} />);
  {
    const $ = createTeam__SimpleField();
    assert({
      given: 'no arguments',
      should: 'render the simple field',
      expected: 1,
      actual: $(`.${styles.team__simpleField}`).length,
    });
  }
  {
    const label = 'Field Label';
    const value = 'Field Value';
    const $ = createTeam__SimpleField({ label, value });
    const contains = match($.html());
    assert({
      given: 'no arguments',
      should: 'render the field label',
      expected: label,
      actual: contains(label),
    });
    assert({
      given: 'no arguments',
      should: 'render the field value',
      expected: value,
      actual: contains(value),
    });
  }
});
