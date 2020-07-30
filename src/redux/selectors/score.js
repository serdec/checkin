import { QUESTION_ACCEPTED, QUESTION_REJECTED } from '../status-types';

export const getScore = (state = []) => {
  if (state.length === 0) return 0;

  return state.reduce((acc, question) => {
    if (question.status === QUESTION_REJECTED) {
      return acc + 10;
    } else if (question.status === QUESTION_ACCEPTED) {
      return acc + 1;
    }

    return 0;
  }, 0);
};
