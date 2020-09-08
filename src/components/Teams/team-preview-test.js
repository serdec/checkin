import React from 'react';
import { describe } from 'riteway';
import match from 'riteway/match';
import render from 'riteway/render-component';

import TeamPreview from './team-preview';
import styles from '../app.module.css';

const createTeamPreview = ({ img = '', name = '' } = {}) =>
  render(<TeamPreview team={{ img: img, name: name }} />);

describe('team preview', async (assert) => {
  {
    const $ = createTeamPreview();
    const contains = match($.html().trim());
    assert({
      given: 'no arguments',
      should: 'render the team preview',
      actual: contains(`${styles.cardButton}`),
      expected: styles.cardButton,
    });
  }
  {
    const img = 'img.png';
    const $ = createTeamPreview({ img });
    const contains = match($.html().trim());
    assert({
      given: 'an image',
      should: 'render the team preview with the image',
      actual: contains(img),
      expected: img,
    });
  }
});
