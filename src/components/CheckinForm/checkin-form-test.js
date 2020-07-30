import { describe } from 'riteway';
import render from 'riteway/render-component';
import React from 'react';

import CheckinForm from './checkin-form';

describe('Checkin form', async (assert) => {
  const $ = render(<CheckinForm />);

  assert({
    given: 'no arguments',
    should: 'Render a form ',
    actual: $('.checkinForm').length,
    expected: 1,
  });
});
