import { clearNewCheckin } from './list-reducer';

const SET_FEEDBACK = 'CHECKIN::SET_FEEDBACK';
const CLEAR_FEEDBACK = 'CHECKIN::CLEAR_FEEDBACK';

export const setFeedback = ({ feedbackName = '', value = '' } = {}) => ({
  type: `${SET_FEEDBACK}_${feedbackName}`,
  payload: value,
});

export const clearFeedback = ({ feedbackName = '' } = {}) => ({
  type: `${CLEAR_FEEDBACK}_${feedbackName}`,
  payload: '',
});

export const getFeedback = (state) => state;

const feedbackReducer = (feedbackName = '') => (
  state = '',
  { type = '', payload = '' } = {}
) => {
  switch (type) {
    case clearFeedback({ feedbackName }).type:
    case setFeedback({ feedbackName }).type:
      return payload;
    case clearNewCheckin().type:
      return '';
    default:
      return state;
  }
};

export default feedbackReducer;
