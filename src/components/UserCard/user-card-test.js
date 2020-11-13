import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import UserCard from './user-card';
import styles from './user-card.module.css';

describe('user-card', async (assert) => {
  const createUserCard = () => render(<UserCard />);

  {
    const $ = createUserCard();
    {
      assert({
        given: 'no arguments',
        should: 'render the team user card',
        expected: 1,
        actual: $(`.${styles.userCard}`).length,
      });
    }
  }
});
