import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import CheckboxForm from './checkbox-form';
import styles from './checkbox-form.module.css';

describe('checkbox form', async (assert) => {
  const $ = render(<CheckboxForm img={'testimage.png'} />);

  assert({
    given: 'no arguments',
    should: 'Render a CheckboxForm ',
    actual: $(`.${styles.checkboxForm}`).length,
    expected: 1,
  });
});
