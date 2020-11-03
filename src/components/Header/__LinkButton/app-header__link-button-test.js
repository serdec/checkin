import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import AppHeader__LinkButton from './app-header__link-button';
import styles from '../app-header.module.css';

describe('app-header-link-button', async (assert) => {
  const createAppHeader__LinkButton = ({
    label = 'Link',
    href = '/',
    as = '',
  } = {}) =>
    render(<AppHeader__LinkButton label={label} href={href} as={as} />);

  {
    const $ = createAppHeader__LinkButton();
    assert({
      given: 'no arguments',
      should: 'render the link button',
      expected: 1,
      actual: $(`.${styles.appHeader__linkButton}`).length,
    });
  }
  {
    const label = 'myLink';
    const $ = createAppHeader__LinkButton({ label });
    const contains = match($.html());
    assert({
      given: 'a label',
      should: 'render that label',
      expected: label,
      actual: contains(label),
    });
  }
  {
    const href = '/some/path';
    const $ = createAppHeader__LinkButton({ href });
    const contains = match($.html());
    assert({
      given: 'a href',
      should: 'render a link with the href',
      expected: href,
      actual: contains(href),
    });
  }
  {
    const href = '/some/path';
    const as = 'some/as';
    const $ = createAppHeader__LinkButton({ href, as });
    const contains = match($.html());
    assert({
      given: 'a href and an as attribute',
      should: 'render a link with the as attribute',
      expected: as,
      actual: contains(as),
    });
  }
});
