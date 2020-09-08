import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import CheckboxForm from './checkbox-form';

describe('checkbox form', async (assert) => {
  const $ = render(<CheckboxForm img={'testimage.png'} />);

  assert({
    given: 'no arguments',
    should: 'Render a CheckboxForm ',
    actual: $('.checkboxForm').length,
    expected: 1,
  });
});
