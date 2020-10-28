import React from 'react';
import moment from 'moment';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import CalendarCell from './calendar-cell';
import styles from '../history.module.css';

describe('calendar-cell', async (assert) => {
  const createCalendarCell = ({ colorValue = 0, date = moment() } = {}) =>
    render(<CalendarCell colorValue={colorValue} date={date} />);
  {
    const $ = createCalendarCell();
    assert({
      given: 'no arguments',
      should: 'render the calendar cell',
      expected: 1,
      actual: $(`.${styles.history__calendarCell}`).length,
    });
  }
  {
    const date = moment('2020-10-15');
    const $ = createCalendarCell({ date });
    const searchText = '15';
    const contains = match($.html());
    assert({
      given: 'a date',
      should: 'render the date',
      expected: searchText,
      actual: contains(searchText),
    });
  }
  {
    const values = [0, 1, 2, 3, 4];
    values.map((colorValue) => {
      const $ = createCalendarCell({ colorValue });
      const colorClass = styles[`history__calendarCell_${colorValue}`];
      assert({
        given: `the color colorValue ${colorValue}`,
        should: 'render the cell with the corresponding color',
        expected: 1,
        actual: $(`.${colorClass}`).length,
      });
    });
  }
});
