import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import styles from './control-panel.module.css';
import ControlPanel from './control-panel';

describe('control panel', async (assert) => {
  const createDevControls = () => render(<ControlPanel />);
  {
    const $ = createDevControls();
    assert({
      given: 'no argument',
      should: 'render the dev controls component',
      expected: 1,
      actual: $(`.${styles.controlPanel}`).length,
    });
  }
});
