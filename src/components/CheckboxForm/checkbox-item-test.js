import React from 'react';
import { describe } from 'riteway';
import match from 'riteway/match';
import render from 'riteway/render-component';
import CheckboxItem from './checkbox-item';

describe('checkbox item', async (assert) => {
  const createCheckboxItem = (label = '') =>
    render(<CheckboxItem label={label} />);

  {
    const $ = createCheckboxItem();
    assert({
      given: 'no arguments',
      should: 'Render a CheckboxItem ',
      actual: $('.checkboxItemSelector').length,
      expected: 1,
    });
  }

  {
    const label = 'My label';
    const $ = createCheckboxItem(label);
    const contains = match($.html().trim());
    assert({
      given: 'a label',
      should: 'Render a CheckboxItem with the given label',
      actual: contains(label),
      expected: label,
    });
  }
});
