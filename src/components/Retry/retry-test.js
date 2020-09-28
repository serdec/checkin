import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import appStyles from '../app.module.css';
import Retry from './retry';

describe('retry', async (assert) => {
  const createRetry = () => render(<Retry />);

  {
    const $ = createRetry();
    assert({
      given: 'no arguments',
      should: 'render the Retry component',
      expected: 1,
      actual: $(`.${appStyles.centralBox}`).length,
    });
  }
});
