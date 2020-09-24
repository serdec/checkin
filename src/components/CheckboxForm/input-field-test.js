import React from 'react';
import { describe } from 'riteway';
import match from 'riteway/match';
import render from 'riteway/render-component';
import InputFieldWithAddButton from './input-field';

describe('input field', async (assert) => {
  const createInputFieldWithAddButton = () =>
    render(<InputFieldWithAddButton l />);

  {
    const $ = createInputFieldWithAddButton();
    assert({
      given: 'no arguments',
      should: 'Render a CheckboxItem ',
      actual: $('.inputFieldWithAddButtonSelector').length,
      expected: 1,
    });
  }

  {
    const $ = createInputFieldWithAddButton();
    const contains = match($.html().trim());
    assert({
      given: 'no arguments',
      should: 'Render the add button',
      actual: contains('button'),
      expected: 'button',
    });
  }
});
