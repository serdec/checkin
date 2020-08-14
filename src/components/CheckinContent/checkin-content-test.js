import { describe } from 'riteway';
import render from 'riteway/render-component';
import React from 'react';

import CheckboxForm from './Steps/StepsContent/CheckboxContent/checkbox-form';

describe('Checkin form', async (assert) => {
  const $ = render(<CheckboxForm />);

  assert({
    given: 'no arguments',
    should: 'Render a form ',
    actual: $('.checkboxForm').length,
    expected: 1,
  });
});
