import { describe } from 'riteway';
import { getScore } from './score';
import { QUESTION_REJECTED, QUESTION_ACCEPTED } from '../status-types';

const createQuestion = (status) => ({
  id: 'First question',
  status,
  timestamp: 12345209423,
  ask: 'This is a sample question',
  askee: 'Some askee',
});

describe('score()', async (assert) => {
  assert({
    given: 'empty state',
    should: 'return 0',
    actual: getScore([]),
    expected: 0,
  });

  assert({
    given: 'a rejected question and an accepted one',
    should: 'return 11',
    actual: getScore([
      createQuestion(QUESTION_REJECTED),
      createQuestion(QUESTION_ACCEPTED),
    ]),
    expected: 11,
  });

  assert({
    given: 'a pending question',
    should: 'return 0',
    actual: getScore([createQuestion('pending')]),
    expected: 0,
  });
});
