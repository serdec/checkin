import { describe } from 'riteway';
import moment from 'moment';
import { getDateString, getCurrentDateString, getDateMoment } from './date';

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
  {
    assert({
      given: 'a date',
      should: 'return the date as a moment',
      actual: getDateMoment(),
      expected: undefined,
    });
  }
  {
    const date = new Date('12-25-2020');
    assert({
      given: 'a date',
      should: 'return the date as a moment',
      actual: getDateMoment(date),
      expected: moment(date),
    });
  }
});
