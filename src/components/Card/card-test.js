import React from 'react';
import render from 'riteway/render-component';
import match from 'riteway/match';
import { describe } from 'riteway';
import Card from './card';
import styles from './styles.module.css';

describe('card', async (assert) => {
  const createCheckboxCard = ({ title = '', img = '', children = [] } = {}) =>
    render(
      <Card title={title} img={img}>
        {children}
      </Card>
    );

  {
    const $ = createCheckboxCard();
    const contains = match($.html().trim());
    assert({
      given: 'no arguments',
      should: 'render the card header ',
      actual: contains(`${styles.cardHeader}`),
      expected: styles.cardHeader,
    });
  }

  {
    const $ = createCheckboxCard({ children: <h1>child</h1> });
    const contains = match($.html().trim());
    assert({
      given: 'a child',
      should: 'render the child',
      actual: contains('child'),
      expected: 'child',
    });
  }

  {
    const title = 'My Title';
    const $ = createCheckboxCard({ title });
    const contains = match($.html().trim());
    assert({
      given: 'a title',
      should: 'render a card with the given title',
      actual: contains(`${title}`),
      expected: title,
    });
  }
});
