import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import Loading from './loading';
import styles from './styles.module.css';

describe('loading', async (assert) => {
  const createLoadingComponent = () => render(<Loading />);
  {
    const $ = createLoadingComponent();
    assert({
      given: 'no arguments',
      should: 'render the loading component',
      expected: 1,
      actual: $(`.${styles.loading}`).length,
    });
  }
});
