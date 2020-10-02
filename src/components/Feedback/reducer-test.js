import { describe } from 'riteway';
import feedbackReducer, {
  setFeedback,
  clearFeedback,
  getFeedback,
} from './reducer';

const defaultFeedbackReducer = feedbackReducer();

describe('feedback reducer', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'return the valid initial state',
    actual: defaultFeedbackReducer(),
    expected: '',
  });

  {
    const value = 'This is some feedback';
    const state = defaultFeedbackReducer(
      defaultFeedbackReducer(),
      setFeedback({ value })
    );
    assert({
      given: 'a feedback',
      should: 'set the state with the content of the feedback',
      actual: getFeedback(state),
      expected: value,
    });
  }

  {
    const value = 'This is some feedback';
    const state = defaultFeedbackReducer(
      defaultFeedbackReducer(),
      setFeedback({ value })
    );
    assert({
      given: 'a feedback',
      should: 'clear the feedback',
      actual: defaultFeedbackReducer(state, clearFeedback()),
      expected: '',
    });
  }
});
