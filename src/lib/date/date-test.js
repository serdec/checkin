import { describe } from 'riteway';
import moment from 'moment';
import { getDateString, getCurrentDateString } from './date';

describe('date', async (assert) => {
  {
    const day = '01/31/2020';
    const date = new Date(day);
    assert({
      given: 'a date',
      should: 'return a string representing the date',
      actual: getDateString(date),
      expected: day,
    });
  }
  {
    const day = '12/25/2020';
    const date = new Date(day);
    assert({
      given: 'a date',
      should: 'return a string representing the date',
      actual: getDateString(date),
      expected: day,
    });
  }
  {
    assert({
      given: 'no arguments',
      should: 'return the current date as string',
      actual: getCurrentDateString(),
      expected: moment(new Date()).format('L'),
    });
  }
});
