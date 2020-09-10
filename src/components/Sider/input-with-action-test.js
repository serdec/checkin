import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import InputWithAction from './input-with-action';
import styles from './sider.module.css';

describe('input with action', async (assert) => {
  const createInputComponent = ({
    actionName = 'Create',
    placeholder = 'TestPlaceholder',
  } = {}) =>
    render(
      <InputWithAction actionName={actionName} placeholder={placeholder} />
    );

  {
    const $ = createInputComponent();
    const contains = match($.html().trim());
    assert({
      given: 'no arguments',
      should: 'render the input component',
      actual: contains(`${styles.inputWithAction}`),
      expected: styles.inputWithAction,
    });
  }
  {
    const actionName = 'Action';
    const $ = createInputComponent({ actionName });
    const contains = match($.html().trim());
    assert({
      given: 'no arguments',
      should: 'render the Action Button',
      actual: contains(actionName),
      expected: actionName,
    });
  }
  {
    const $ = createInputComponent();
    const contains = match($.html().trim());
    assert({
      given: 'no arguments',
      should: 'render the Cancel Button',
      actual: contains('Cancel'),
      expected: 'Cancel',
    });
  }
  {
    const placeholder = 'Add input';
    const $ = createInputComponent({ placeholder });
    const contains = match($.html().trim());
    assert({
      given: 'no arguments',
      should: 'render the Input with the placeholder',
      actual: contains(placeholder),
      expected: placeholder,
    });
  }
});
