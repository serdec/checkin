import { describe } from 'riteway';
import feedbackReducer, {
  setFeedback,
  clearFeedback,
  getFeedback,
} from './feedback';

const defaultFeedbackReducer = feedbackReducer();
const setDefaultFeedback = setFeedback();
const clearDefaultFeedback = clearFeedback;

describe('feedback reducer', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'return the valid initial state',
    actual: defaultFeedbackReducer(),
    expected: '',
  });

  {
    const feedback = 'This is some feedback';
    const state = defaultFeedbackReducer(
      defaultFeedbackReducer(),
      setDefaultFeedback(feedback)
    );
    assert({
      given: 'a feedback',
      should: 'set the state with the content of the feedback',
      actual: getFeedback(state),
      expected: feedback,
    });
  }

  {
    const feedback = 'This is some feedback';
    const state = defaultFeedbackReducer(
      defaultFeedbackReducer(),
      setDefaultFeedback({ value: feedback })
    );
    assert({
      given: 'a feedback',
      should: 'clear the feedback',
      actual: defaultFeedbackReducer(state, clearDefaultFeedback()),
      expected: '',
    });
  }
});
