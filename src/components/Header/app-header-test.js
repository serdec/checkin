import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import { AppHeader } from './app-header';
import styles from './app-header.module.css';

describe('app-header', async (assert) => {
  const createAppHeader = ({
    isSignedIn = true,
    activeTeam = { id: '1', owners: [] },
    user = {},
  } = {}) =>
    render(
      <AppHeader isSignedIn={isSignedIn} activeTeam={activeTeam} user={user} />
    );
  {
    const $ = createAppHeader();
    assert({
      given: 'no arguments',
      should: 'render the app header',
      expected: 1,
      actual: $(`.${styles.appHeader}`).length,
    });
  }
  {
    const $ = createAppHeader({ isSignedIn: false });
    assert({
      given: 'a user not logged in',
      should: 'render the app login button',
      expected: 1,
      actual: $(`.${styles.appHeader__loginButton}`).length,
    });
  }
  {
    const $ = createAppHeader({ isSignedIn: true });
    assert({
      given: 'a logged in user',
      should: 'render the app logout button',
      expected: 1,
      actual: $(`.${styles.appHeader__logoutButton}`).length,
    });
    assert({
      given: 'a logged in user',
      should: 'render the teams button',
      expected: 1,
      actual: $(`.${styles.appHeader__teamsButton}`).length,
    });
  }
  {
    const $ = createAppHeader({ isSignedIn: false });
    assert({
      given: 'a user not logged in',
      should: 'not render the teams button',
      expected: 0,
      actual: $(`.${styles.appHeader__teamsButton}`).length,
    });
  }
  {
    const $ = createAppHeader({ isSignedIn: true });
    assert({
      given: 'a logged in user',
      should: 'render the links button',
      expected: 2,
      actual: $(`.${styles.appHeader__linkButton}`).length,
    });
  }
});
