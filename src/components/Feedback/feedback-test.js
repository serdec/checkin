import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import Feedback from './feedback';
import styles from './styles.module.css';

describe('feedback container', async (assert) => {
  const createFeedbackContainer = () => render(<Feedback />);
  {
    const $ = createFeedbackContainer();
    assert({
      given: 'no argument',
      should: 'render the feedback container',
      expected: 1,
      actual: $(`.${styles.feedbackContainer}`).length,
    });
  }
});
