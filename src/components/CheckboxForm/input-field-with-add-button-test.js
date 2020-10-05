import React from 'react';
import { describe } from 'riteway';
import match from 'riteway/match';
import render from 'riteway/render-component';
import InputField from './input-field-with-add-button';
import styles from './checkbox-form.module.css';
describe('input field', async (assert) => {
  const createInputFieldWithAddButton = () => render(<InputField />);

  {
    const $ = createInputFieldWithAddButton();
    assert({
      given: 'no arguments',
      should: 'Render a CheckboxItem ',
      actual: $(`.${styles.inputField}`).length,
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
