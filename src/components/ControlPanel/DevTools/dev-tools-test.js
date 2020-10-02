import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import styles from '../styles.module.css';
import DevControls from './dev-tools';

describe('dev controls', async (assert) => {
  const createDevControls = () => render(<DevControls />);
  {
    const $ = createDevControls();
    assert({
      given: 'no argument',
      should: 'render the dev controls component',
      expected: 1,
      actual: $(`.${styles.devControlsBox}`).length,
    });
  }
});
