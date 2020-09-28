import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import styles from '../styles.module.css';
import UserControls from './user-controls';

describe('user controls', async (assert) => {
  const createUserControls = () => render(<UserControls />);
  {
    const $ = createUserControls();
    assert({
      given: 'no argument',
      should: 'render the user control component',
      expected: 1,
      actual: $(`.${styles.userControlsBox}`).length,
    });
  }
});
